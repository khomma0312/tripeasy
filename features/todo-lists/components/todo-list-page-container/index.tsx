"use client";

import { useGetTodoListsIdSuspense } from "@/services/api/endpoints/todo-lists/todo-lists";
import { convertDataTypesToMatchTodoList } from "../../utils";
import { TodoListPage } from "../todo-list-page";

type Props = {
  todoListId: number;
};

export const TodoListPageContainer = ({ todoListId }: Props) => {
  const { data } = useGetTodoListsIdSuspense(todoListId);

  const todoList = convertDataTypesToMatchTodoList(data);

  return <TodoListPage todoList={todoList} />;
};
