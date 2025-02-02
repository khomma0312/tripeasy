import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { useDeleteAccommodationsId } from "@/services/api/endpoints/accommodations/accommodations";

export const useDeleteAccommodation = (id: number) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useDeleteAccommodationsId({
    mutation: {
      onSuccess: () => {
        toast({ title: "宿泊施設情報を削除しました" });

        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === `/api/accommodations/${id}` ||
            query.queryKey[0] === `/api/accommodations`,
        });
      },
      onError: () => {
        errorToast("宿泊施設情報の削除に失敗しました");
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
