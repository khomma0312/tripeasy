import { useToast } from "@/hooks/shadcn/use-toast";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDeleteTodoListsId } from "@/services/api/endpoints/todo-lists/todo-lists";

export const useDeleteTodoList = () => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onSuccess = useCallback(() => {
    toast({ title: "Todoリストを削除しました" });
    queryClient.invalidateQueries({
      queryKey: [`/api/todo-lists`],
    });
    router.push("/todo-lists");
  }, [toast, queryClient]);

  const onError = useCallback(() => {
    errorToast("Todoリストの削除に失敗しました");
  }, [errorToast]);

  const { mutate: deleteTodoListMutate } = useDeleteTodoListsId({
    mutation: {
      onSuccess,
      onError,
    },
  });

  return {
    deleteTodoListMutate,
  };
};
