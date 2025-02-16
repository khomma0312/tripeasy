import { Trip } from "@/features/trips/types";
import { useSelectedTripDayIndexAtomValue } from "@/features/trips/store/selected-trip-day-index";

export const useItineraryMap = (trip: Trip) => {
  // 選択された日付のインデックスを取得
  const selectedDayIndex = useSelectedTripDayIndexAtomValue();

  // 選択された日付の旅行ポイントを取得
  const tripRoutePoints = trip.tripDays[selectedDayIndex ?? 0].tripRoutePoints;

  const origin = tripRoutePoints[0].latLng
    ? {
        visitOrder: tripRoutePoints[0].visitOrder,
        latLng: {
          lat: tripRoutePoints[0].latLng.x,
          lng: tripRoutePoints[0].latLng.y,
        },
      }
    : undefined;

  const lastPoint = tripRoutePoints[tripRoutePoints.length - 1];
  const destination = lastPoint?.latLng
    ? {
        visitOrder: lastPoint.visitOrder,
        latLng: {
          lat: lastPoint.latLng.x,
          lng: lastPoint.latLng.y,
        },
      }
    : undefined;

  const waypoint_locations = tripRoutePoints
    .slice(1, -1)
    .map((tripRoutePoint) =>
      tripRoutePoint.latLng
        ? {
            visitOrder: tripRoutePoint.visitOrder,
            latLng: {
              lat: tripRoutePoint.latLng.x,
              lng: tripRoutePoint.latLng.y,
            },
          }
        : undefined
    );

  const allPoints = [origin, ...waypoint_locations, destination];
  const validPoints = allPoints.filter((point) => point !== undefined);

  return {
    tripRoutePoints,
    origin,
    destination,
    waypoint_locations,
    validPoints,
  };
};
