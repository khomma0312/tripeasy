import { format } from "date-fns";
import { usePatchTodoItemsId } from "@/services/api/endpoints/todo-items/todo-items";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateTodoItem = (todoListId: number) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePatchTodoItemsId({
    mutation: {
      onSuccess: () => {
        toast({ title: "項目を更新しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/todo-lists/${todoListId}`],
        });
      },
      onError: () => {
        errorToast("項目の更新に失敗しました");
      },
    },
  });

  const toggleTodoStatus = (id: number, isCompleted: boolean) => {
    // TODO: ステータスのみ更新するmutateを実行する
  };

  return {
    isPending,
    mutate,
    toggleTodoStatus,
  };
};
