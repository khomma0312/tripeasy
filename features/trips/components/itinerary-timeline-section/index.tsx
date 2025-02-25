import { TripDay } from "@/features/trips/types";
import { colorNames, getBgColorForTripDay } from "@/features/trips/consts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ItineraryTripRoutePointCard } from "@/features/trips/components/itinerary-trip-route-point-card";
import { TripRoutePointAddButtonGroup } from "@/features/trips/components/trip-route-point-add-button-group";
import { cn } from "@/utils/common";

type Props = {
  tripDay: TripDay;
};

export const ItineraryTimelineSection = ({ tripDay }: Props) => {
  const { dayOrder, dayDate, tripRoutePoints } = tripDay;
  const colorIndex = (dayOrder - 1) % colorNames.length;
  const itineraryDayDate = new Date(dayDate);

  return (
    <div className="flex flex-col gap-4 p-4">
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
      <div className="flex flex-col gap-3">
        {tripRoutePoints.map((tripRoutePoint) => (
          <ItineraryTripRoutePointCard
            key={tripRoutePoint.visitOrder}
            tripRoutePoint={tripRoutePoint}
            itineraryDayDate={itineraryDayDate}
          />
        ))}
      </div>
      {/* 予定追加ボタン部分 */}
      <TripRoutePointAddButtonGroup />
    </div>
  );
};
