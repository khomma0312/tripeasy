import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useDeleteTodoItemsId } from "@/services/api/endpoints/todo-items/todo-items";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteTodoItem = (todoListId: number) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useDeleteTodoItemsId({
    mutation: {
      onSuccess: () => {
        toast({ title: "項目を削除しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/todo-lists/${todoListId}`],
        });
      },
      onError: () => {
        errorToast("項目の削除に失敗しました");
      },
    },
  });

  const deleteTodo = (todoId: number) => {
    mutate({ id: todoId });
  };

  return {
    isPending,
    deleteTodo,
  };
};
