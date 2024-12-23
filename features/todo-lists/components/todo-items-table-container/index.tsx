"use client";

import { useGetTodoListsIdSuspense } from "@/services/api/endpoints/todo-lists/todo-lists";
import { TodoItemsTable } from "../todo-items-table";
import { convertDataTypesToMatchTodoList } from "../../utils";

const mockTodoList = {
  id: 1,
  title: "奈良に行こう",
  tripId: 1,
  tripTitle: "奈良に行こう",
  tripDate: new Date("2024-01-15"),
  items: [
    {
      id: 1,
      title: "Book flights",
      dueDate: new Date("2024-01-10"),
      isCompleted: true,
      order: 1,
    },
    {
      id: 2,
      title: "Reserve hotel",
      dueDate: new Date("2023-12-20"),
      isCompleted: true,
      order: 2,
    },
    {
      id: 3,
      title: "Plan itinerary",
      dueDate: new Date("2023-12-14"),
      isCompleted: false,
      order: 3,
    },
    {
      id: 4,
      title: "Exchange currency",
      isCompleted: false,
      order: 4,
    },
    {
      id: 5,
      title: "Pack suitcase",
      dueDate: new Date("2024-01-08"),
      isCompleted: false,
      order: 5,
    },
  ],
};

type Props = {
  todoListId: number;
};

export const TodoItemsTableContainer = ({ todoListId }: Props) => {
  const { data } = useGetTodoListsIdSuspense(todoListId);

  const todoList = convertDataTypesToMatchTodoList(data);

  return <TodoItemsTable todoList={todoList} />;
};
