import { useEffect, useRef, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useSelectedDestinationAtomValue } from "../../store/selected-destination";
import { Point } from "../../hooks/use-itinerary-map";

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
  validPoints: Point[];
};

export const MapDirections = ({
  origin,
  destination,
  waypoint_locations,
  validPoints,
}: Props) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const selectedDestination = useSelectedDestinationAtomValue();
  const validPointsRef = useRef([] as Point[]);

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  // 検索で場所を選択した場合と、目的地に変更があった場合どちらも適切にズーム/パンが行われるよう調整
  useEffect(() => {
    if (directionsRenderer && selectedDestination?.latLng) {
      directionsRenderer.setOptions({ preserveViewport: true });
    }

    if (
      directionsRenderer &&
      validPointsRef.current.length !== validPoints.length
    ) {
      directionsRenderer.setOptions({ preserveViewport: false });
    }

    validPointsRef.current = validPoints;
  }, [selectedDestination, directionsRenderer, validPoints]);

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
  ]);

  return null;
};
