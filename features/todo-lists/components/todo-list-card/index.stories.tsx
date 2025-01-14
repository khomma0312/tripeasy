import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "@storybook/test";
import mockRouter from "next-router-mock";
import { TodoListCard } from ".";

const meta: Meta<typeof TodoListCard> = {
  component: TodoListCard,
};

export default meta;
type Story = StoryObj<typeof TodoListCard>;

export const Default: Story = {
  args: {
    id: 1,
    title: "旅行タスク",
    startDate: "2023-06-15",
    totalTasks: 10,
    completedTasks: 5,
  },
  name: "デフォルト表示",
};

export const NoStartDate: Story = {
  args: {
    ...Default.args,
    startDate: undefined,
  },
  name: "日付なし",
};

export const AllTasksCompleted: Story = {
  args: {
    ...Default.args,
    totalTasks: 10,
    completedTasks: 10,
  },
  name: "タスクを全て完了した状態",
};

export const InteractionTest: Story = {
  beforeEach: () => {
    mockRouter.setCurrentUrl("/todo-lists");
  },
  args: {
    ...Default.args,
  },
  name: "インタラクションテスト",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // タイトルが正しく表示されていることを確認
    const title = canvas.getByText("旅行タスク");
    expect(title).toBeInTheDocument();

    // 期限が正しく表示されていることを確認
    const startDate = canvas.getByText("期限: 2023/06/15");
    expect(startDate).toBeInTheDocument();

    // タスクの完了状況が正しく表示されていることを確認
    const taskStatus = canvas.getByText("完了タスク: 5 / 10");
    expect(taskStatus).toBeInTheDocument();

    // 「詳細を見る」ボタンが存在することを確認
    const detailButton = canvas.getByRole("link", { name: "詳細を見る" });
    expect(detailButton).toBeInTheDocument();

    // ボタンのhref属性が正しいことを確認
    expect(detailButton).toHaveAttribute("href", "/todo-lists/1");

    // ボタンをクリックできることを確認
    await userEvent.click(detailButton);
    await expect(mockRouter).toMatchObject({
      pathname: "/todo-lists/1",
    });
  },
};
