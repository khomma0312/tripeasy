import type { Meta, StoryObj } from "@storybook/react";
import { TodoListTableLoadingSkeleton } from ".";

const meta: Meta<typeof TodoListTableLoadingSkeleton> = {
  component: TodoListTableLoadingSkeleton,
};

export default meta;
type Story = StoryObj<typeof TodoListTableLoadingSkeleton>;

export const Default: Story = {
  name: "デフォルト表示",
};
