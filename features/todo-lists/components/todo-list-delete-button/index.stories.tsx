import type { Meta, StoryObj } from "@storybook/react";
import {
  expect,
  within,
  userEvent,
  screen,
  fn,
  waitFor,
} from "@storybook/test";
import { TodoListDeleteButton } from ".";

const meta: Meta<typeof TodoListDeleteButton> = {
  component: TodoListDeleteButton,
};

export default meta;
type Story = StoryObj<typeof TodoListDeleteButton>;

export const Default: Story = {
  args: {
    onDelete: fn(),
  },
  name: "デフォルト表示",
};

export const InteractionTest: Story = {
  args: {
    onDelete: fn(),
  },
  name: "インタラクションテスト",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 削除ボタンが表示されていることを確認
    const deleteButton = canvas.getByRole("button", { name: "削除" });
    expect(deleteButton).toBeInTheDocument();

    // 削除ボタンをクリック
    await userEvent.click(deleteButton);

    // ダイアログが表示されることを確認
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // ダイアログのタイトルを確認
    const dialogTitle = within(dialog).getByText("Todoリストを削除");
    expect(dialogTitle).toBeInTheDocument();

    // ダイアログの説明文を確認
    const dialogDescription = within(dialog).getByText(
      "Todoリストを削除してもよろしいですか？"
    );
    expect(dialogDescription).toBeInTheDocument();

    // 削除ボタンを確認
    const confirmDeleteButton = within(dialog).getByRole("button", {
      name: "削除",
    });
    expect(confirmDeleteButton).toBeInTheDocument();

    // キャンセルボタンを確認
    const cancelButton = within(dialog).getByRole("button", {
      name: "キャンセル",
    });
    expect(cancelButton).toBeInTheDocument();

    // 削除ボタンをクリック
    await userEvent.click(confirmDeleteButton);

    // onDelete関数が呼び出されたことを確認
    expect(args.onDelete).toHaveBeenCalled();

    // ダイアログが閉じられ、元の削除ボタンが再び表示されるのを待つ
    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "削除" })).toBeInTheDocument();
    });

    // 再度削除ボタンをクリックしてダイアログを開く
    await userEvent.click(deleteButton);

    // キャンセルボタンをクリック
    const newDialog = await screen.findByRole("dialog");
    const newCancelButton = within(newDialog).getByRole("button", {
      name: "キャンセル",
    });
    await userEvent.click(newCancelButton);

    // ダイアログが閉じられ、元の削除ボタンが再び表示されるのを待つ
    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "削除" })).toBeInTheDocument();
    });

    // onDelete関数が2回目は呼び出されていないことを確認
    expect(args.onDelete).toHaveBeenCalledTimes(1);
  },
};
