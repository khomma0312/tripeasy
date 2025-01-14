import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoItemAddSchema } from "@/lib/zod/schema/todo-items";
import {
  expect,
  within,
  userEvent,
  waitFor,
  screen,
  fn,
} from "@storybook/test";
import { TodoItemAddForm } from ".";
import { z } from "zod";

const meta: Meta<typeof TodoItemAddForm> = {
  component: TodoItemAddForm,
  decorators: [
    (Story, context) => {
      const form = useForm<z.infer<typeof todoItemAddSchema>>({
        resolver: zodResolver(todoItemAddSchema),
        defaultValues: {
          title: "",
          dueDate: undefined,
        },
      });
      const mockIsPending = context.args.isPending || false;
      const mockOnSubmit = context.args.onSubmit || fn();
      return (
        <Story
          args={{
            form,
            isPending: mockIsPending,
            onSubmit: mockOnSubmit,
          }}
        />
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof TodoItemAddForm>;

export const Default: Story = {
  args: {
    isPending: false,
    onSubmit: fn(),
  },
  name: "デフォルト表示",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // フォーム要素が正しくレンダリングされていることを確認
    const titleInput = canvas.getByPlaceholderText("やることを入力");
    expect(titleInput).toBeInTheDocument();

    const datePicker = canvas.getByRole("button", { name: "期限日を選択" });
    expect(datePicker).toBeInTheDocument();

    const submitButton = canvas.getByRole("button", { name: "Todoを追加" });
    expect(submitButton).toBeInTheDocument();

    // フォームに値を入力
    await userEvent.type(titleInput, "Test Todo");
    await userEvent.click(datePicker);
    const dateCell = screen.getByRole("gridcell", { name: "15" });
    await userEvent.click(dateCell);

    // フォームを送信
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};

export const WithPendingState: Story = {
  args: {
    isPending: true,
    onSubmit: fn(),
  },
  name: "ペンディング状態",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByPlaceholderText("やることを入力");
    expect(titleInput).toBeDisabled();

    const submitButton = canvas.getByRole("button", { name: "Todoを追加" });
    expect(submitButton).toBeDisabled();
  },
};

export const WithValidationError: Story = {
  args: {
    isPending: false,
    onSubmit: fn(),
  },
  name: "バリデーションエラー",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitButton = canvas.getByRole("button", { name: "Todoを追加" });
    await userEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    const errorMessage = await canvas.findByText("やることを入力してください");
    expect(errorMessage).toBeInTheDocument();
  },
};
