import { Trip } from "@/features/trips/types";
import { useSelectedTripDayIndexAtomValue } from "@/features/trips/store/selected-trip-day-index";

export const useItineraryMap = (trip: Trip) => {
  type Point = {
    name: string;
    address: string | undefined;
    visitOrder: number;
    latLng: {
      lat: number;
      lng: number;
    };
  };

  // 選択された日付のインデックスを取得
  const selectedDayIndex = useSelectedTripDayIndexAtomValue();

  // 選択された日付の旅行ポイントを取得
  const tripRoutePoints = trip.tripDays[selectedDayIndex ?? 0].tripRoutePoints;

  const origin: Point | undefined = tripRoutePoints[0].latLng
    ? {
        name: tripRoutePoints[0].name,
        address: tripRoutePoints[0].address,
        visitOrder: tripRoutePoints[0].visitOrder,
        latLng: {
          lat: tripRoutePoints[0].latLng.y,
          lng: tripRoutePoints[0].latLng.x,
        },
      }
    : undefined;

  const lastPoint = tripRoutePoints[tripRoutePoints.length - 1];
  const destination: Point | undefined = lastPoint?.latLng
    ? {
        name: lastPoint.name,
        address: lastPoint.address,
        visitOrder: lastPoint.visitOrder,
        latLng: {
          lat: lastPoint.latLng.y,
          lng: lastPoint.latLng.x,
        },
      }
    : undefined;

  const waypoint_locations: (Point | undefined)[] = tripRoutePoints
    .slice(1, -1)
    .map((tripRoutePoint) =>
      tripRoutePoint.latLng
        ? {
            name: tripRoutePoint.name,
            address: tripRoutePoint.address,
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
