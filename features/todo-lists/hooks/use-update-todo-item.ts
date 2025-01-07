import {
  usePatchTodoItemsId,
  usePatchTodoItemsIsCompletedId,
} from "@/services/api/endpoints/todo-items/todo-items";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useUpdateTodoItem = (todoListId: number) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();

  const onSuccess = useCallback(() => {
    toast({ title: "項目を更新しました" });
    queryClient.invalidateQueries({
      queryKey: [`/api/todo-lists/${todoListId}`],
    });
  }, [toast, queryClient]);

  const onError = useCallback(() => {
    errorToast("項目の更新に失敗しました");
  }, [errorToast]);

  const { mutate: updateTodoItemMutate } = usePatchTodoItemsId({
    mutation: {
      onSuccess,
      onError,
    },
  });

  const { mutate: updateTodoStatusMutate } = usePatchTodoItemsIsCompletedId({
    mutation: {
      onSuccess,
      onError,
    },
  });

  return {
    updateTodoItemMutate,
    updateTodoStatusMutate,
  };
};
