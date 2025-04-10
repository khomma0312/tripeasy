import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Trip, TripRoutePoint } from "@/features/trips/types";
import { useErrorToast } from "@/hooks/common/use-error-toast";
import { useToast } from "@/hooks/shadcn/use-toast";
import { usePatchTripRoutePointsReorder } from "@/services/api/endpoints/trip-route-points/trip-route-points";

export const useUpdateTripRoutePoints = (
  tripId: number,
  tripDayId: number,
  setSortableItems?: Dispatch<SetStateAction<TripRoutePoint[] | undefined>>
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { errorToast } = useErrorToast();

  const { mutate, isPending, error } = usePatchTripRoutePointsReorder({
    mutation: {
      onMutate: async () => {
        // GETのqueryKeyは`/api/trips/${id}`なので、それのクエリをキャンセルする
        await queryClient.cancelQueries({
          queryKey: [`/api/trips/${tripId}`],
        });

        // 以前の値のスナップショットを取得
        const previous = queryClient.getQueryData<{
          trip: Trip;
        }>([`/api/trips/${tripId}`]);

        // 以前の値のコンテキストオブジェクトを返す
        return { previous };
      },
      onSuccess: () => {
        toast({ title: "旅行地点を更新しました" });

        queryClient.invalidateQueries({
          queryKey: [`/api/trips/${tripId}`],
        });
      },
      onError: (err, variables, context) => {
        const previousTripDay = context?.previous?.trip?.tripDays
          ? context?.previous?.trip?.tripDays.find(
              (tripDay) => tripDay.tripDayId === tripDayId
            )
          : undefined;

        errorToast("旅行地点の更新に失敗しました");
        // エラーが発生した場合、onMutateから返されたコンテキストを使用してロールバック
        queryClient.setQueryData([`/api/trips/${tripId}`], context?.previous);

        // UIの状態も元に戻す
        if (setSortableItems) {
          setSortableItems(previousTripDay?.tripRoutePoints);
        }
      },
    },
  });

  return {
    updateTripRoutePoints: (updatedPoints: TripRoutePoint[]) =>
      mutate({ data: { tripRoutePoints: updatedPoints } }),
    isPending,
    error,
  };
};
