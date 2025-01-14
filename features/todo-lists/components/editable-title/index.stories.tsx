import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { EditableTitle } from ".";

const meta: Meta<typeof EditableTitle> = {
  component: EditableTitle,
};
export default meta;

export const Default: StoryObj<typeof EditableTitle> = {
  args: {
    defaultTitle: "Default Title",
    onSave: fn(),
  },
  name: "デフォルト表示",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 初期状態を確認
    const initialTitle = canvas.getByText("Default Title");
    expect(initialTitle).toBeInTheDocument();

    // 編集ボタンをクリック
    const editButton = canvas.getByLabelText("タイトルを編集");
    await userEvent.click(editButton);

    // 入力フィールドが表示されることを確認
    const inputField = canvas.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    // 新しいタイトルを入力
    await userEvent.clear(inputField);
    await userEvent.type(inputField, "New Title");

    // 保存ボタンをクリック
    const saveButton = canvas.getByLabelText("タイトルを保存");
    await userEvent.click(saveButton);

    // onSave関数が呼び出されたことを確認
    expect(args.onSave).toHaveBeenCalledWith("New Title");

    // 編集モードが終了し、再びタイトルが表示されることを確認
    const newTitle = canvas.getByText("Default Title");
    expect(newTitle).toBeInTheDocument();
    expect(canvas.queryByRole("textbox")).not.toBeInTheDocument();
  },
};

export const CancelEdit: StoryObj<typeof EditableTitle> = {
  args: {
    defaultTitle: "Default Title",
    onSave: fn(),
  },
  name: "編集のキャンセル",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 初期状態を確認
    const initialTitle = canvas.getByText("Default Title");
    expect(initialTitle).toBeInTheDocument();

    // 編集ボタンをクリック
    const editButton = canvas.getByLabelText("タイトルを編集");
    await userEvent.click(editButton);

    // 入力フィールドが表示されることを確認
    const inputField = canvas.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    // 新しいタイトルを入力
    await userEvent.clear(inputField);
    await userEvent.type(inputField, "Cancelled Title");

    // キャンセルボタンをクリック
    const cancelButton = canvas.getByLabelText("タイトルの編集をキャンセル");
    await userEvent.click(cancelButton);

    // 元のタイトルが表示され、入力フィールドが消えていることを確認
    expect(canvas.getByText("Default Title")).toBeInTheDocument();
    expect(canvas.queryByRole("textbox")).not.toBeInTheDocument();
  },
};
