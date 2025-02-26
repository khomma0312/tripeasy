import { memo } from "react";
import { DestinationSearchResults } from "@/features/trips/components/destination-search-results";
import { useGetDestinationsSearchSuspenseInfinite } from "@/services/api/custom/endpoints/destinations/get";

type Props = {
  searchTerm: string;
  searchByPlaceId: boolean;
};

export const DestinationSearchResultsContainer = memo(
  ({ searchTerm, searchByPlaceId }: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useGetDestinationsSearchSuspenseInfinite({
        searchTerm,
        searchByPlaceId,
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
