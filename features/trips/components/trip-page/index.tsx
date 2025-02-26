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
    <div className="grid grid-cols-[1fr_2fr]">
      {isDestinationSearchOpen ? (
        <DestinationSearchSideBar />
      ) : (
        <ItinerarySideBar trip={trip} />
      )}
      <ItineraryMap trip={trip} />
    </div>
  );
};
