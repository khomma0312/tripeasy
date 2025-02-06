import { UseFormReturn } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { format } from "date-fns";
import { dateFormatStrForParse } from "@/consts/common";
import { TripFormFieldValues } from "@/features/trips/types";
import { usePostTrips } from "@/services/api/endpoints/trips/trips";
import { useRouter } from "next/navigation";

export const useAddTrip = (form: UseFormReturn<TripFormFieldValues>) => {
  const router = useRouter();
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePostTrips({
    mutation: {
      onSuccess: (data) => {
        toast({ title: "旅行予定を追加しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/trips`],
        });
        form.reset();
        const { id } = data;
        router.push(`/trips/${id}`);
      },
      onError: () => {
        errorToast("旅行予定の追加に失敗しました");
      },
    },
  });

  const addTrip = (trip: TripFormFieldValues) => {
    // mutateの引数の型に合わせるため、型を変換
    const typeConvertedTrip = {
      ...trip,
      startDate: format(trip.startDate, dateFormatStrForParse),
      endDate: format(trip.endDate, dateFormatStrForParse),
    };

    mutate({
      data: {
        trip: typeConvertedTrip,
      },
    });
  };

  const onSubmit = (trip: TripFormFieldValues) => {
    addTrip(trip);
  };

  return {
    isPending,
    onSubmit,
  };
};
