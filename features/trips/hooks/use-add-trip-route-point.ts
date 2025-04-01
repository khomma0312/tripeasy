import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { usePostTripRoutePoints } from "@/services/api/endpoints/trip-route-points/trip-route-points";
import {
  TripRoutePointFormAccommodationFieldValues,
  TripRoutePointFormDestinationFieldValues,
  TripRoutePointFormFieldValues,
} from "@/features/trips/types";
import { UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import { generateRandomKey } from "@/utils/common";

export const useAddTripRoutePoint = (
  form:
    | UseFormReturn<TripRoutePointFormAccommodationFieldValues>
    | UseFormReturn<TripRoutePointFormDestinationFieldValues>,
  tripId: number
) => {
  const formKeyRef = useRef(generateRandomKey());
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePostTripRoutePoints({
    mutation: {
      onSuccess: () => {
        toast({ title: "旅行地点を追加しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/trips/${tripId}`],
        });
        formKeyRef.current = generateRandomKey();
        form.reset();
      },
      onError: () => {
        errorToast("旅行地点の追加に失敗しました");
      },
    },
  });

  const onSubmit = (tripRoutePoint: TripRoutePointFormFieldValues) => {
    mutate({
      data: {
        tripRoutePoint,
      },
    });
  };

  return { isPending, onSubmit, formKey: formKeyRef.current };
};
