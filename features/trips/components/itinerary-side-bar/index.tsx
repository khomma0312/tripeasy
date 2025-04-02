import { Trip } from "@/features/trips/types";
import { ItineraryTimelineSection } from "@/features/trips/components/itinerary-timeline-section";
import { ItinerarySideBarHeader } from "../itinerary-side-bar-header";
import { ItineraryDayTabGroup } from "@/features/trips/components/itinerary-day-tab-group";

type Props = {
  trip: Trip;
};

export const ItinerarySideBar = ({ trip }: Props) => {
  return (
    <div className="w-full h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-50">
        {/* ヘッダー */}
        <ItinerarySideBarHeader trip={trip} />
        {/* タブナビゲーション */}
        <ItineraryDayTabGroup tripDays={trip.tripDays} />
      </div>
      {/* 各日のタイムライン */}
      <div className="flex flex-col overflow-y-auto flex-1">
        {trip.tripDays.map((tripDay) => (
          <ItineraryTimelineSection
            key={tripDay.dayOrder}
            tripDay={tripDay}
            tripDays={trip.tripDays}
          />
        ))}
      </div>
    </div>
  );
};
