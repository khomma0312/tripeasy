import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDirectionsLegsSetAtom } from "../../store/direction-legs";

type Props = {
  origin: { lat: number; lng: number } | string | undefined;
  destination: { lat: number; lng: number } | string | undefined;
  waypoint_locations: (
    | string
    | {
        lat: number;
        lng: number;
      }
    | undefined
  )[];
};

export const MapDirections = ({
  origin,
  destination,
  waypoint_locations,
}: Props) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const setLegs = useDirectionsLegsSetAtom();

  // ルートのレンダリング
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    // マーカーはカスタムのものを使うので、suppressMarkersをtrueにする
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({ map, suppressMarkers: true })
    );
  }, [routesLibrary, map]);

  // ルートの取得
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin,
        destination,
        waypoints: waypoint_locations?.map((location) => ({
          location,
          stopover: true,
        })),
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((result) => {
        directionsRenderer.setDirections(result);
        setLegs(result.routes[0].legs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    directionsService,
    directionsRenderer,
    origin,
    destination,
    waypoint_locations,
    setLegs,
  ]);

  return null;
};
