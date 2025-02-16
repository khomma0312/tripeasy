import { Trip } from "@/features/trips/types";
import { ItinerarySideBar } from "@/features/trips/components/itinerary-side-bar";
import { ItineraryMap } from "@/features/trips/components/itinerary-map";

type Props = {
  trip: Trip;
};

export const TripPage = ({ trip }: Props) => {
  return (
    <div className="grid grid-cols-[1fr_2fr]">
      <ItinerarySideBar trip={trip} />
      <ItineraryMap trip={trip} />
    </div>
  );
};
