import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { usePostTodoItems } from "@/services/api/endpoints/todo-items/todo-items";
import { format } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import { TodoItem } from "../types";
import { todoItemAddSchema } from "@/lib/zod/schema/todo-items";

export const useAddTodoItem = (todoListId: number, todos: TodoItem[]) => {
  const form = useForm<z.infer<typeof todoItemAddSchema>>({
    resolver: zodResolver(todoItemAddSchema),
    defaultValues: {
      title: "",
      dueDate: undefined,
    },
  });
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePostTodoItems({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`/api/todo-lists/${todoListId}`],
        });
      },
      onError: () => {
        errorToast("アイテムの追加に失敗しました");
      },
    },
  });

  const addTodo = (title: string, dueDate: Date | undefined) => {
    const todoItem = {
      title,
      dueDate: dueDate ? format(dueDate, dateFormatStrForParse) : undefined,
      isCompleted: false,
      order: todos.length + 1,
    };

    mutate({ data: { todoListId, todoItem } });
  };

  const onSubmit = (data: z.infer<typeof todoItemAddSchema>) => {
    const { title, dueDate } = data;
    addTodo(title, dueDate);

    form.reset();
  };

  return {
    form,
    isPending,
    onSubmit,
  };
};
