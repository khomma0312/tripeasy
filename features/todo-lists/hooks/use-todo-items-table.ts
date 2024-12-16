import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TodoItem } from "@/features/todo-lists/types";
import { todoItemAddSchema } from "@/lib/zod/schema/todo-items";

export const useTodoItemsTable = (initialTodos: TodoItem[]) => {
  const form = useForm<z.infer<typeof todoItemAddSchema>>({
    resolver: zodResolver(todoItemAddSchema),
    defaultValues: {
      title: "",
      dueDate: undefined,
    },
  });

  const [todos, setTodos] = useState(
    initialTodos.sort((a, b) => a.order - b.order)
  );
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const toggleTodoStatus = (id: number | null, isCompleted: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted } : item
      )
    );
  };

  const addTodo = (title: string, dueDate: Date | undefined) => {
    // 楽観的更新を以下で実装
    // https://zenn.dev/frontendflat/articles/tanstack-optimistic-update

    if (title.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: null,
          title,
          dueDate,
          isCompleted: false,
          order: prevTodos.length + 1,
        },
      ]);
    }
  };

  const onSubmit = (data: z.infer<typeof todoItemAddSchema>) => {
    const { title, dueDate } = data;
    addTodo(title, dueDate);

    form.reset();
  };

  const updateEditingTodo = (id: number | null, updates: Partial<TodoItem>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const cancelEdit = () => {
    setEditingRow(null);
  };

  const deleteTodo = (id: number | null) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    form,
    todos,
    editingRow,
    setEditingRow,
    onSubmit,
    toggleTodoStatus,
    updateEditingTodo,
    cancelEdit,
    deleteTodo,
  };
};
