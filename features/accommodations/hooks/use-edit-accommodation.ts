import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { usePatchAccommodationsId } from "@/services/api/custom/endpoints/accommodations/patch";
import { format } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import { AccommodationFormFieldValues } from "../types";

export const useEditAccommodation = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();

  const { isPending, mutate } = usePatchAccommodationsId({
    mutation: {
      onSuccess: () => {
        toast({ title: "宿泊施設情報を変更しました" });
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === `/api/accommodations/${id}` ||
            query.queryKey[0] === `/api/accommodations`,
        });
        router.push(`/accommodations/${id}`);
      },
      onError: () => {
        errorToast("宿泊施設情報の変更に失敗しました");
      },
    },
  });

  const editAccommodation = (accommodation: AccommodationFormFieldValues) => {
    // mutateの引数の型に合わせるため、型を変換
    const typeConvertedAccommodation = {
      ...accommodation,
      checkIn: format(accommodation.checkIn, dateFormatStrForParse),
      checkOut: format(accommodation.checkOut, dateFormatStrForParse),
    };

    mutate({
      id,
      data: {
        accommodation: typeConvertedAccommodation,
      },
    });
  };

  const onSubmit = (accommodation: AccommodationFormFieldValues) => {
    editAccommodation(accommodation);
  };

  return {
    isPending,
    onSubmit,
  };
};
