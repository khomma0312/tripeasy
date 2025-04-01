import { TripDay } from "@/features/trips/types";
import { format } from "date-fns";
import { ItineraryDayTab } from "../itinerary-day-tab";

type Props = {
  tripDays: TripDay[];
};

export const ItineraryDayTabGroup = ({ tripDays }: Props) => {
  return (
    <div className="bg-white text-gray-900 border-b flex overflow-x-scroll">
      <ItineraryDayTab title="概要" />
      {tripDays.map((tripDay) => (
        <ItineraryDayTab
          key={tripDay.dayOrder}
          title={format(new Date(tripDay.dayDate), "M月d日")}
          dayOrder={tripDay.dayOrder}
        />
      ))}
    </div>
  );
};
