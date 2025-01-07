"use client";

import { useGetTodoListsSuspense } from "@/services/api/endpoints/todo-lists/todo-lists";
import { TodoListsPage } from "../todo-lists-page";

type Props = {
  currentPage: number;
  perPage: number | undefined;
};

export const TodoListsPageContainer = ({ currentPage, perPage }: Props) => {
  const { data } = useGetTodoListsSuspense({ page: currentPage });
  return (
    <TodoListsPage
      todoLists={data.todoLists}
      currentPage={currentPage}
      totalPages={data.totalPages}
    />
  );
};
