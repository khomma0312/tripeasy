import {
  Active,
  KeyboardSensor,
  Over,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { convertTimeToDate, getDiffInMinutes } from "@/features/trips/utils";
import { addMinutes, format } from "date-fns";
import { TripRoutePoint } from "../types";
import { useState } from "react";

export const useDragAndDropArea = () => {
  const [activeItem, setActiveItem] = useState<TripRoutePoint | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getSortedItemsByDragAndDrop = (
    items: TripRoutePoint[] | undefined,
    active: Active,
    over: Over,
    onUpdateTripRoutePoints: (updatedItems: TripRoutePoint[]) => void
  ) => {
    if (!items) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    // 移動前の各地点間のマージンを計算
    const diffsFromPreviousDepartureTime = items.map((item, index) => {
      if (index === 0) {
        return { id: item.id, diffFromPreviousDepartureTime: 0 };
      }

      const diffFromPreviousDepartureTime = getDiffInMinutes(
        items[index - 1].departureTime,
        item.arrivalTime
      );
      return { id: item.id, diffFromPreviousDepartureTime };
    });

    // 各項目の所要時間を計算
    const itemsWithDuration = items.map((item) => {
      const duration = getDiffInMinutes(item.arrivalTime, item.departureTime);
      return { ...item, duration };
    });

    const reorderedItems = arrayMove(itemsWithDuration, oldIndex, newIndex);

    // 項目の中で一番早い到着時間を取得
    const earliestTime = reorderedItems.reduce((min, item) => {
      const arrival = convertTimeToDate(new Date(), item.arrivalTime);
      return Math.min(min, arrival.getTime());
    }, Infinity);

    // 一番早い到着時間を起点に、各所要時間を各到着時間に足して、出発時間を求める
    const updatedItems = reorderedItems.reduce((acc, item, index) => {
      if (index === 0) {
        const arrivalTime = earliestTime;
        const departureTime = addMinutes(arrivalTime, item.duration);
        return [
          ...acc,
          {
            ...item,
            arrivalTime: format(arrivalTime, "HH:mm:ss"),
            departureTime: format(departureTime, "HH:mm:ss"),
            visitOrder: index + 1,
          },
        ];
      }

      // 一つ前の出発時間と地点間の間隔を元に、所要時間を足して、出発時間を求める
      const diffFromPreviousDepartureTime = diffsFromPreviousDepartureTime.find(
        (diff) => diff.id === item.id
      )?.diffFromPreviousDepartureTime;

      let arrivalTime = convertTimeToDate(
        new Date(),
        acc[index - 1].departureTime
      );

      if (diffFromPreviousDepartureTime) {
        arrivalTime = addMinutes(arrivalTime, diffFromPreviousDepartureTime);
      }

      const departureTime = addMinutes(arrivalTime, item.duration);
      return [
        ...acc,
        {
          ...item,
          arrivalTime: format(arrivalTime, "HH:mm:ss"),
          departureTime: format(departureTime, "HH:mm:ss"),
          visitOrder: index + 1,
        },
      ];
    }, [] as TripRoutePoint[]);

    onUpdateTripRoutePoints(updatedItems);

    return updatedItems;
  };

  return {
    activeItem,
    setActiveItem,
    sensors,
    getSortedItemsByDragAndDrop,
  };
};
