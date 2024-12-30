"use client";

import { useGetTodoListsIdSuspense } from "@/services/api/endpoints/todo-lists/todo-lists";
import { TodoItemsTable } from "../todo-items-table";
import { convertDataTypesToMatchTodoList } from "../../utils";

type Props = {
  todoListId: number;
};

export const TodoItemsTableContainer = ({ todoListId }: Props) => {
  const { data } = useGetTodoListsIdSuspense(todoListId);

  const todoList = convertDataTypesToMatchTodoList(data);

  return <TodoItemsTable todoList={todoList} />;
};
