import { TripDay } from "@/features/trips/types";
import { colorNames, getBgColorForTripDay } from "@/features/trips/consts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { TripRoutePointAddButtonGroup } from "@/features/trips/components/trip-route-point-add-button-group";
import { cn } from "@/utils/common";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useSelectedTripDayIndexAtom } from "@/features/trips/store/selected-trip-day-index";
import { getTripDayIndex } from "@/features/trips/utils";
import { ItineraryTripRoutePointCardArea } from "../itinerary-trip-route-point-card-area";

type Props = {
  tripDay: TripDay;
  tripDays: TripDay[];
};

export const ItineraryTimelineSection = ({ tripDay, tripDays }: Props) => {
  const { ref, entry } = useInView({
    rootMargin: "-20% 0px -50% 0px", // より狭い範囲で判定
  });
  const [selectedTripDayIndex, setSelectedTripDayIndex] =
    useSelectedTripDayIndexAtom();

  const hasCurrentDayTripRoutePoints =
    tripDay?.tripRoutePoints?.length ?? 0 > 0;

  const hasNextDayTripRoutePoints =
    tripDays[selectedTripDayIndex ? selectedTripDayIndex + 1 : 0]
      ?.tripRoutePoints?.length ?? 0 > 0;
  const isVisible = entry?.isIntersecting || false;

  useEffect(() => {
    if (
      isVisible &&
      (hasCurrentDayTripRoutePoints || hasNextDayTripRoutePoints)
    ) {
      const index = getTripDayIndex(tripDay.dayOrder);
      setSelectedTripDayIndex(index);
    }
  }, [
    isVisible,
    setSelectedTripDayIndex,
    tripDay.dayOrder,
    hasCurrentDayTripRoutePoints,
    hasNextDayTripRoutePoints,
  ]);

  const { dayOrder, dayDate, tripDayId, tripRoutePoints } = tripDay;
  const colorIndex = (dayOrder - 1) % colorNames.length;
  const itineraryDayDate = new Date(dayDate);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div ref={ref} />
      {/* ヘッダー部分 */}
      <div className="flex justify-between">
        <h4
          className={cn(
            `text-white font-bold px-3 py-1 rounded-md`,
            getBgColorForTripDay(colorIndex)
          )}
        >
          {dayOrder}日目
        </h4>
        <p className="text-gray-600 text-sm underline">
          {format(itineraryDayDate, "M/d(E)", { locale: ja })}
        </p>
      </div>
      {/* コンテンツ部分 */}
      <ItineraryTripRoutePointCardArea
        tripRoutePoints={tripRoutePoints}
        itineraryDayDate={itineraryDayDate}
      />
      {/* 予定追加ボタン部分 */}
      <TripRoutePointAddButtonGroup tripDayId={tripDayId} />
    </div>
  );
};
