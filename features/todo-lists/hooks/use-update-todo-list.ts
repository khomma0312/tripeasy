import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { usePatchTodoListsId } from "@/services/api/endpoints/todo-lists/todo-lists";

export const useUpdateTodoList = (todoListId: number) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();

  const onSuccess = useCallback(() => {
    toast({ title: "Todoリストを更新しました" });
    queryClient.invalidateQueries({
      queryKey: [`/api/todo-lists/${todoListId}`],
    });
  }, [toast, queryClient]);

  const onError = useCallback(() => {
    errorToast("Todoリストの更新に失敗しました");
  }, [errorToast]);

  const { mutate: updateTodoListMutate } = usePatchTodoListsId({
    mutation: {
      onSuccess,
      onError,
    },
  });

  return {
    updateTodoListMutate,
  };
};
