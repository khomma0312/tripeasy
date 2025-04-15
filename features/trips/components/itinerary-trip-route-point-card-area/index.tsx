import { useParams } from "next/navigation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TripRoutePoint } from "@/features/trips/types";
import { SortableItineraryTripRoutePointCard } from "@/features/trips/components/sortable-itinerary-trip-route-point-card";
import { useUpdateTripRoutePoints } from "@/features/trips/hooks/use-update-trip-route-points";
import { useOptimisticTripRoutePointsAtom } from "@/features/trips/store/optimisitic-trip-route-points";
import { useDragAndDropArea } from "@/features/trips/hooks/use-drag-and-drop-area";

type Props = {
  tripDayId: number;
  tripRoutePoints: TripRoutePoint[] | undefined;
  itineraryDayDate: Date;
};

export const ItineraryTripRoutePointCardArea = ({
  tripDayId,
  tripRoutePoints,
  itineraryDayDate,
}: Props) => {
  const { id } = useParams();

  const { activeItem, setActiveItem, sensors, getSortedItemsByDragAndDrop } =
    useDragAndDropArea();

  const [optimisticTripRoutePoints, setOptimisticTripRoutePoints] =
    useOptimisticTripRoutePointsAtom(tripRoutePoints);

  const { updateTripRoutePoints } = useUpdateTripRoutePoints(
    Number(id),
    tripDayId
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveItem(
      optimisticTripRoutePoints?.find((item) => item.id === active.id) ?? null
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOptimisticTripRoutePoints((items) =>
        getSortedItemsByDragAndDrop(items, active, over, updateTripRoutePoints)
      );
    }
  };

  if (!optimisticTripRoutePoints) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={optimisticTripRoutePoints?.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {optimisticTripRoutePoints?.map((tripRoutePoint) => (
            <SortableItineraryTripRoutePointCard
              key={tripRoutePoint.id}
              tripRoutePoint={tripRoutePoint}
              itineraryDayDate={itineraryDayDate}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <SortableItineraryTripRoutePointCard
            tripRoutePoint={activeItem}
            itineraryDayDate={itineraryDayDate}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
