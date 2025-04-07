import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TripRoutePoint } from "../../types";
import { SortableItineraryTripRoutePointCard } from "../sortable-itinerary-trip-route-point-card";

type Props = {
  tripRoutePoints: TripRoutePoint[] | undefined;
  itineraryDayDate: Date;
};

export const ItineraryTripRoutePointCardArea = ({
  tripRoutePoints,
  itineraryDayDate,
}: Props) => {
  const [sortableItems, setSortableItems] = useState(tripRoutePoints);
  const [activeItem, setActiveItem] = useState<TripRoutePoint | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveItem(sortableItems?.find((item) => item.id === active.id) ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortableItems((items) => {
        if (!items) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (!sortableItems) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortableItems?.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {sortableItems?.map((tripRoutePoint) => (
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
