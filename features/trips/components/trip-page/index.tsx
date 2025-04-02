import { Trip } from "@/features/trips/types";
import { ItinerarySideBar } from "@/features/trips/components/itinerary-side-bar";
import { ItineraryMap } from "@/features/trips/components/itinerary-map";
import { DestinationSearchSideBar } from "@/features/trips/components/destination-search-side-bar";
import { useIsDestinationSearchOpenAtomValue } from "@/features/trips/store/is-destination-search-open";

type Props = {
  trip: Trip;
};

export const TripPage = ({ trip }: Props) => {
  const isDestinationSearchOpen = useIsDestinationSearchOpenAtomValue();
  return (
    <div className="grid grid-cols-[490px_1fr]">
      {isDestinationSearchOpen && <DestinationSearchSideBar />}
      {!isDestinationSearchOpen && <ItinerarySideBar trip={trip} />}
      <ItineraryMap trip={trip} />
    </div>
  );
};
