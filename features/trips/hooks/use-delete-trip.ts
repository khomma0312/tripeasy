import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useDeleteTripsId } from "@/services/api/endpoints/trips/trips";

export const useDeleteTrip = (id: number) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useDeleteTripsId({
    mutation: {
      onSuccess: () => {
        toast({ title: "旅程情報を削除しました" });

        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === `/api/trips/${id}` ||
            query.queryKey[0] === `/api/trips`,
        });
      },
      onError: () => {
        errorToast("旅程情報の削除に失敗しました");
      },
    },
  });

  const onSubmit = (id: number) => {
    mutate({
      id,
    });
  };

  return {
    isPending,
    onSubmit,
  };
};
