import { cn } from "@/utils/common";
import { useSelectedTripDayIndexAtom } from "@/features/trips/store/selected-trip-day-index";
import { getTripDayIndex } from "@/features/trips/utils";

type Props = {
  title: string;
  dayOrder?: number;
};

export const ItineraryDayTab = ({ title, dayOrder }: Props) => {
  const [selectedDay, setSelectedDay] = useSelectedTripDayIndexAtom();
  const index = getTripDayIndex(dayOrder);

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center px-6 py-2 min-w-[120px] border-r border-gray-200 cursor-pointer hover:bg-gray-100",
        selectedDay === index ? "border-b-4 border-b-primary" : ""
      )}
      onClick={() => setSelectedDay(index)}
    >
      <h3 className="text-sm font-bold">{title}</h3>
      {dayOrder && <p className="text-sm">{dayOrder}日目</p>}
    </div>
  );
};
