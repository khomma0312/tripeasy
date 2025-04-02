import { useEffect } from "react";
import { Trip } from "@/features/trips/types";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { useItineraryMap } from "@/features/trips/hooks/use-itinerary-map";
import { MapDirections } from "@/features/trips/components/map-directions";
import { TripRoutePointMarker } from "../trip-route-point-marker";
import { useSelectedDestinationAtomValue } from "@/features/trips/store/selected-destination";
import { DestinationMarker } from "@/features/trips/components/destination-marker";
import { useMapCenterPositionSetAtom } from "../../store/map-center-position";
import { useSelectedTripDayIndexAtomValue } from "../../store/selected-trip-day-index";

type Props = {
  trip: Trip;
};

const DEFAULT_CENTER = { lat: 35.725216, lng: 139.720861 };
const DEFAULT_ZOOM = 10;

export const ItineraryMap = ({ trip }: Props) => {
  const map = useMap();
  const { origin, destination, waypoint_locations, validPoints } =
    useItineraryMap(trip);
  const selectedDestination = useSelectedDestinationAtomValue();
  const setMapCenterPosition = useMapCenterPositionSetAtom();
  const selectedTripDayIndex = useSelectedTripDayIndexAtomValue();

  const center = map?.getCenter();

  useEffect(() => {
    if (center && !selectedDestination) {
      setMapCenterPosition({
        lat: center.lat(),
        lng: center.lng(),
      });
    }
  }, [center, setMapCenterPosition, selectedDestination]);

  useEffect(() => {
    if (map && selectedDestination?.latLng) {
      map.panTo(selectedDestination.latLng);
      map.setZoom(15);
    }
  }, [selectedDestination]);

  // すべてのポイントの中心を計算する関数
  const calculateCenterOfPoints = () => {
    if (validPoints.length === 0) return DEFAULT_CENTER;

    let sumLat = 0;
    let sumLng = 0;

    validPoints.forEach((point) => {
      sumLat += point.latLng.lat;
      sumLng += point.latLng.lng;
    });

    return {
      lat: sumLat / validPoints.length,
      lng: sumLng / validPoints.length,
    };
  };

  // すべてのポイントの中心座標
  const pointsCenter = calculateCenterOfPoints();
  // ポイントがある場合はzoomレベルを15にする
  const zoomLevel = validPoints.length > 0 ? 15 : DEFAULT_ZOOM;

  return (
    <Map
      key={selectedTripDayIndex}
      mapId={"DEMO_MAP_ID"}
      style={{ width: "100%", height: "100vh" }}
      defaultCenter={pointsCenter}
      defaultZoom={zoomLevel}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      {validPoints.map((point) => {
        const key =
          typeof point === "string"
            ? point
            : `${point.latLng.lat},${point.latLng.lng}`;
        return (
          <TripRoutePointMarker
            key={key}
            position={point.latLng}
            visitOrder={point.visitOrder}
            name={point.name}
            address={point.address}
          />
        );
      })}
      {
        <MapDirections
          origin={origin?.latLng}
          destination={destination?.latLng}
          waypoint_locations={waypoint_locations?.map(
            (location) => location?.latLng
          )}
          validPoints={validPoints}
        />
      }
      {selectedDestination && (
        <DestinationMarker destination={selectedDestination} />
      )}
    </Map>
  );
};
