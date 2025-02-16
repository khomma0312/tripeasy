import { useCallback, useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { colorsForTripDay } from "@/features/trips/consts";
import { useSelectedTripDayIndexAtomValue } from "@/features/trips/store/selected-trip-day-index";

type Props = {
  position: { lat: number; lng: number };
  visitOrder: number;
};

export const TripRoutePointMarker = ({ position, visitOrder }: Props) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const selectedTripDayIndex = useSelectedTripDayIndexAtomValue();

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}
      >
        <Pin
          background={colorsForTripDay[selectedTripDayIndex ?? 0]}
          borderColor={colorsForTripDay[selectedTripDayIndex ?? 0]}
          glyphColor={"#ffffff"}
          glyph={visitOrder.toString()}
        />
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h2>InfoWindow content!</h2>
          <p>Some arbitrary html to be rendered into the InfoWindow.</p>
        </InfoWindow>
      )}
    </>
  );
};
