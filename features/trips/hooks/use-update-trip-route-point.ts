import { useQueryClient } from "@tanstack/react-query";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import {
  Trip,
  TripRoutePointUpdateFormFieldValues,
  TripRoutePointUpdateInputValues,
} from "@/features/trips/types";
import { UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import { generateRandomKey } from "@/utils/common";
import { usePatchTripRoutePointsId } from "@/services/api/endpoints/trip-route-points/trip-route-points";
import { useOptimisticTripRoutePointsSetAtom } from "@/features/trips/store/optimisitic-trip-route-points";

export const useUpdateTripRoutePoint = (
  form: UseFormReturn<TripRoutePointUpdateFormFieldValues>,
  tripId: number
) => {
  const setOptimisticTripRoutePoints = useOptimisticTripRoutePointsSetAtom();
  const formKeyRef = useRef(generateRandomKey());
  const { toast } = useToast();
  const { errorToast } = useErrorToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = usePatchTripRoutePointsId({
    mutation: {
      onMutate: async (variables) => {
        // GETのqueryKeyは`/api/trips/${id}`なので、それのクエリをキャンセルする
        await queryClient.cancelQueries({
          queryKey: [`/api/trips/${tripId}`],
        });

        // 以前の値のスナップショットを取得
        const previous = queryClient.getQueryData<{
          trip: Trip;
        }>([`/api/trips/${tripId}`]);

        const updatedAccommodation =
          variables.data.tripRoutePoint.accommodation;
        const updatedDestination = variables.data.tripRoutePoint.destination;

        // 変更されたtripRoutePointのデータでoptimisticなデータを更新
        const updatedTripRoutePoints =
          previous?.trip?.tripDays
            ?.find((tripDay) =>
              tripDay.tripRoutePoints?.some(
                (tripRoutePoint) => tripRoutePoint.id === variables.id
              )
            )
            ?.tripRoutePoints?.map((tripRoutePoint) => {
              if (tripRoutePoint.id === variables.id) {
                return {
                  ...tripRoutePoint,
                  name:
                    updatedAccommodation?.name ??
                    updatedDestination?.name ??
                    "",
                  arrivalTime:
                    updatedAccommodation?.arrivalTime ??
                    updatedDestination?.arrivalTime ??
                    "",
                  departureTime:
                    updatedAccommodation?.departureTime ??
                    updatedDestination?.departureTime ??
                    "",
                };
              }
              return tripRoutePoint;
            }) || undefined;

        // 変更されたtripRoutePointのデータでUIを更新
        setOptimisticTripRoutePoints(updatedTripRoutePoints);

        // 以前の値のコンテキストオブジェクトを返す
        return { previous };
      },
      onSuccess: () => {
        toast({ title: "旅行地点を更新しました" });
        queryClient.invalidateQueries({
          queryKey: [`/api/trips/${tripId}`],
        });

        form.reset();
        formKeyRef.current = generateRandomKey();
      },
      onError: (err, variables, context) => {
        const previousTripDay = context?.previous?.trip?.tripDays?.find(
          (tripDay) =>
            tripDay.tripRoutePoints?.some(
              (tripRoutePoint) => tripRoutePoint.id === variables.id
            )
        );

        errorToast("旅行地点の更新に失敗しました");
        // エラーが発生した場合、onMutateから返されたコンテキストを使用してロールバック
        queryClient.setQueryData([`/api/trips/${tripId}`], context?.previous);

        // UIの状態も元に戻す
        setOptimisticTripRoutePoints(previousTripDay?.tripRoutePoints || []);
      },
    },
  });

  const onSubmit = (tripRoutePoint: TripRoutePointUpdateInputValues) => {
    const id =
      tripRoutePoint.accommodation?.id || tripRoutePoint.destination?.id;

    if (!id) {
      errorToast("更新対象の旅行地点が正しく指定されていません");
      return;
    }

    mutate({
      id,
      data: {
        tripRoutePoint,
      },
    });
  };

  return {
    isPending,
    onSubmit,
    formKey: formKeyRef.current,
  };
};
