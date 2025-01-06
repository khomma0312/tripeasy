"use client";

import { useGetTodoListsSuspense } from "@/services/api/endpoints/todo-lists/todo-lists";
import { TodoListsWithPagination } from "../todo-lists-with-pagination";

type Props = {
  currentPage: number;
  perPage: number | undefined;
};

export const TodoListsContainer = ({ currentPage, perPage }: Props) => {
  const { data } = useGetTodoListsSuspense({ page: currentPage });
  return (
    <TodoListsWithPagination
      todoLists={data.todoLists}
      currentPage={currentPage}
      totalPages={data.totalPages}
    />
  );
};
