import { memo } from "react";
import { DestinationSearchResults } from "@/features/trips/components/destination-search-results";
import { useGetDestinationsSearchSuspenseInfinite } from "@/services/api/custom/endpoints/destinations/get";
import { useSearchPlaceTypeAtomValue } from "@/features/trips/store/search-place-type";

type Props = {
  searchTerm: string;
  searchByPlaceId: boolean;
  searchLocation: { lat: number; lng: number } | undefined;
};

export const DestinationSearchResultsContainer = memo(
  ({ searchTerm, searchByPlaceId, searchLocation }: Props) => {
    const searchPlaceType = useSearchPlaceTypeAtomValue();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useGetDestinationsSearchSuspenseInfinite({
        searchTerm,
        searchByPlaceId,
        searchLocationLat: searchLocation?.lat,
        searchLocationLng: searchLocation?.lng,
        searchType: searchPlaceType,
      });

    return (
      <DestinationSearchResults
        pages={data.pages}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    );
  }
);

DestinationSearchResultsContainer.displayName =
  "DestinationSearchResultsContainer";
