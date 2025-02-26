import { useCallback, useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { colorNames, getColorForTripDay } from "@/features/trips/consts";
import { useSelectedTripDayIndexAtomValue } from "@/features/trips/store/selected-trip-day-index";

type Props = {
  position: { lat: number; lng: number };
  visitOrder: number;
  name: string;
  address: string | undefined;
};

export const TripRoutePointMarker = ({
  position,
  visitOrder,
  name,
  address,
}: Props) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const selectedTripDayIndex = useSelectedTripDayIndexAtomValue();
  const dividerNum = colorNames.length - 1;
  const colorIndex = selectedTripDayIndex
    ? selectedTripDayIndex % dividerNum
    : undefined;

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}
      >
        <Pin
          background={getColorForTripDay(colorIndex ?? 0)}
          borderColor={getColorForTripDay(colorIndex ?? 0)}
          glyphColor={"#ffffff"}
          glyph={visitOrder.toString()}
        />
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h4 className="text-base font-bold">{name}</h4>
          <p className="text-sm text-gray-600">{address}</p>
        </InfoWindow>
      )}
    </>
  );
};
