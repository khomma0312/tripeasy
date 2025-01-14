"use client";

import { TodoList } from "@/features/todo-lists/types";
import { TodoListHeaderContainer } from "../todo-list-header-container";
import { TodoItemAddFormContainer } from "../todo-item-add-form-container";
import { TodoListTableContainer } from "../todo-list-table-container";

type Props = {
  todoList: TodoList;
};

export const TodoListPage = ({ todoList }: Props) => {
  return (
    <div>
      <TodoListHeaderContainer todoList={todoList} />
      <TodoItemAddFormContainer todoList={todoList} />
      <TodoListTableContainer todoList={todoList} />
    </div>
  );
};
