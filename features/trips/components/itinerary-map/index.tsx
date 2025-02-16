import { Trip } from "@/features/trips/types";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useItineraryMap } from "@/features/trips/hooks/use-itinerary-map";
import { MapDirections } from "@/features/trips/components/map-directions";
import { TripRoutePointMarker } from "../trip-route-point-marker";

type Props = {
  trip: Trip;
};

export const ItineraryMap = ({ trip }: Props) => {
  const { origin, destination, waypoint_locations, validPoints } =
    useItineraryMap(trip);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        mapId={"DEMO_MAP_ID"}
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={{ lat: 35.725216, lng: 139.720861 }}
        defaultZoom={8}
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
      </Map>
    </APIProvider>
  );
};
