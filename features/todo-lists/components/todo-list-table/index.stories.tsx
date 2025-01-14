import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within, screen } from "@storybook/test";
import { TodoList } from "@/features/todo-lists/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { TodoListTable } from ".";

const meta: Meta<typeof TodoListTable> = {
  component: TodoListTable,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Story />
          </Provider>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof TodoListTable>;

const mockTodoList: TodoList = {
  id: 1,
  title: "テストTodoリスト",
  tripDate: new Date("2023-07-15"),
  tripId: 1,
  tripTitle: "テスト旅行",
  items: [
    { id: 1, title: "タスク1", isCompleted: false, order: 1 },
    { id: 2, title: "タスク2", isCompleted: true, order: 2 },
    { id: 3, title: "タスク3", isCompleted: false, order: 3 },
  ],
};

const mockProps = {
  todoList: mockTodoList,
  deleteTodo: fn(),
  updateTodoStatusMutate: fn(),
  updateTodoItemMutate: fn(),
};

export const Default: Story = {
  name: "デフォルト表示",
  args: mockProps,
};

export const EmptyList: Story = {
  name: "空のリスト",
  args: {
    ...mockProps,
    todoList: { ...mockTodoList, items: [] },
  },
};

export const TableTest: Story = {
  name: "テーブルテスト",
  args: mockProps,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // テーブルヘッダーが正しく表示されていることを確認
    const headers = canvas.getAllByRole("columnheader");
    expect(headers).toHaveLength(4); // 状態、タイトル、作成日、アクションの4列
    expect(headers[0]).toHaveTextContent("Done");
    expect(headers[1]).toHaveTextContent("やること");
    expect(headers[2]).toHaveTextContent("期限日");
    expect(headers[3]).toHaveTextContent("");

    // テーブルの行数が正しいことを確認
    const rows = canvas.getAllByRole("row");
    expect(rows).toHaveLength(4); // ヘッダー行 + 3つのタスク行

    // 各行のセルの内容を確認
    const cells = canvas.getAllByRole("cell");
    expect(cells).toHaveLength(12); // 3行 * 4列

    // タスク1の内容を確認
    expect(cells[0]).toHaveTextContent(""); // 状態（チェックボックス）
    expect(cells[1]).toHaveTextContent("タスク1");
    // 作成日のセルは日付形式によって変わるため、ここではスキップ
    expect(cells[3]).toHaveTextContent("Open menu"); // アクション（編集・削除ボタン）

    // タスク2の内容を確認（完了済み）
    expect(cells[4]).toHaveTextContent(""); // 状態（チェックボックス、チェック済み）
    expect(cells[5]).toHaveTextContent("タスク2");

    // タスク3の内容を確認
    expect(cells[8]).toHaveTextContent(""); // 状態（チェックボックス）
    expect(cells[9]).toHaveTextContent("タスク3");

    // ステータス更新のテスト
    const checkboxes = canvas.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);
    expect(args.updateTodoStatusMutate).toHaveBeenCalled();

    // アイテム更新のテスト
    const menuButtons = canvas.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);
    const editButtons = screen.getAllByRole("menuitem", { name: "編集" });
    await userEvent.click(editButtons[0]);
    await userEvent.type(canvas.getByRole("textbox"), "変更後");
    await userEvent.click(canvas.getByLabelText("Todoアイテムを保存"));
    expect(args.updateTodoItemMutate).toHaveBeenCalledWith({
      id: 1,
      data: {
        title: "タスク1変更後",
        dueDate: undefined,
      },
    });

    // 削除のテスト
    const newMenuButtons = canvas.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(newMenuButtons[0]);
    const deleteButtons = screen.getAllByRole("menuitem", { name: "削除" });
    await userEvent.click(deleteButtons[0]);
    expect(args.deleteTodo).toHaveBeenCalledWith(1);
  },
};

export const EmptyTableTest: Story = {
  name: "空のテーブルテスト",
  args: {
    ...mockProps,
    todoList: { ...mockTodoList, items: [] },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // テーブルヘッダーが正しく表示されていることを確認
    const headers = canvas.getAllByRole("columnheader");
    expect(headers).toHaveLength(4);

    // 空のメッセージが表示されていることを確認
    const emptyMessage = canvas.getByText("TODOがまだ登録されていません");
    expect(emptyMessage).toBeInTheDocument();
  },
};
