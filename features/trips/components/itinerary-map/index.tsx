import { useEffect } from "react";
import { Trip } from "@/features/trips/types";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { useItineraryMap } from "@/features/trips/hooks/use-itinerary-map";
import { MapDirections } from "@/features/trips/components/map-directions";
import { TripRoutePointMarker } from "../trip-route-point-marker";
import { useSelectedDestinationAtomValue } from "@/features/trips/store/selected-destination";
import { DestinationMarker } from "@/features/trips/components/destination-marker";

type Props = {
  trip: Trip;
};

const DEFAULT_CENTER = { lat: 35.725216, lng: 139.720861 };
const DEFAULT_ZOOM = 8;

export const ItineraryMap = ({ trip }: Props) => {
  const map = useMap();
  const { origin, destination, waypoint_locations, validPoints } =
    useItineraryMap(trip);
  const selectedDestination = useSelectedDestinationAtomValue();

  useEffect(() => {
    if (map && selectedDestination?.latLng) {
      map.panTo(selectedDestination.latLng);
      map.setZoom(15);
    }
  }, [selectedDestination]);

  return (
    <Map
      mapId={"DEMO_MAP_ID"}
      style={{ width: "100%", height: "100vh" }}
      defaultCenter={DEFAULT_CENTER}
      defaultZoom={DEFAULT_ZOOM}
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
      {validPoints.length > 1 && (
        <MapDirections
          origin={origin?.latLng}
          destination={destination?.latLng}
          waypoint_locations={waypoint_locations?.map(
            (location) => location?.latLng
          )}
        />
      )}
      {selectedDestination && (
        <DestinationMarker destination={selectedDestination} />
      )}
    </Map>
  );
};
