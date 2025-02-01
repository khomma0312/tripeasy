import { UseFormReturn } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { usePostAccommodations } from "@/services/api/custom/endpoints/accommodations/post";
import { format } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import { AccommodationFormFieldValues } from "../types";

export const useAddAccommodation = (
  form: UseFormReturn<AccommodationFormFieldValues>
) => {
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePostAccommodations({
    mutation: {
      onSuccess: () => {
        toast({ title: "宿泊施設情報を追加しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/accommodations`],
        });
        form.reset();
      },
      onError: () => {
        errorToast("宿泊施設情報の追加に失敗しました");
      },
    },
  });

  const addAccommodation = (accommodation: AccommodationFormFieldValues) => {
    // mutateの引数の型に合わせるため、型を変換
    const typeConvertedAccommodation = {
      ...accommodation,
      checkIn: format(accommodation.checkIn, dateFormatStrForParse),
      checkOut: format(accommodation.checkOut, dateFormatStrForParse),
    };

    mutate({
      data: {
        accommodation: typeConvertedAccommodation,
      },
    });
  };

  const onSubmit = (accommodation: AccommodationFormFieldValues) => {
    addAccommodation(accommodation);
  };

  return {
    isPending,
    onSubmit,
  };
};
