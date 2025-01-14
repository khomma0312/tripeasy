import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent, fn } from "@storybook/test";
import { TodoListHeader } from ".";

const meta: Meta<typeof TodoListHeader> = {
  component: TodoListHeader,
};

export default meta;
type Story = StoryObj<typeof TodoListHeader>;

const mockTodoList = {
  id: 1,
  title: "旅行の準備",
  tripDate: new Date("2023-07-15"),
  tripId: 1,
  tripTitle: "テスト旅行",
  items: [],
};

export const Default: Story = {
  name: "デフォルト表示",
  args: {
    todoList: mockTodoList,
    updateTodoListMutate: fn(),
    deleteTodoListMutate: fn(),
  },
};

export const WithoutTripDate: Story = {
  name: "旅行日付なし",
  args: {
    todoList: { ...mockTodoList, tripDate: undefined },
    updateTodoListMutate: fn(),
    deleteTodoListMutate: fn(),
  },
};
