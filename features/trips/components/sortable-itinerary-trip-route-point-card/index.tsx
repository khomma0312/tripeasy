import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TripRoutePoint } from "@/features/trips/types";
import { ItineraryTripRoutePointCard } from "../itinerary-trip-route-point-card";

type Props = {
  tripRoutePoint: TripRoutePoint;
  itineraryDayDate: Date;
};

export const SortableItineraryTripRoutePointCard = ({
  tripRoutePoint,
  itineraryDayDate,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tripRoutePoint.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <ItineraryTripRoutePointCard
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      tripRoutePoint={tripRoutePoint}
      itineraryDayDate={itineraryDayDate}
    />
  );
};
