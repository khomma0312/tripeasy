"use client";

import { TodoList } from "@/features/todo-lists/types";
import { TodoListTable } from "../todo-list-table";
import { TodoItemAddForm } from "../todo-item-add-form";
import { TodoListHeader } from "../todo-list-header";

type Props = {
  todoList: TodoList;
};

export const TodoListPage = ({ todoList }: Props) => {
  return (
    <div>
      <TodoListHeader todoList={todoList} />
      <TodoItemAddForm todoList={todoList} />
      <TodoListTable todoList={todoList} />
    </div>
  );
};
