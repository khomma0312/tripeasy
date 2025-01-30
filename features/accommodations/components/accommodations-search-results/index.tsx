import { useEffect } from "react";
import { SearchResultCard } from "../search-result-card";
import { AccommodationForSearchResult } from "../../types";
import { useSearchPagingInfoSetAtom } from "@/features/accommodations/store/search-paging-info";

type Props = {
  accommodations: AccommodationForSearchResult[];
  pageCount: number;
  currentPage: number;
};

export const AccommodationsSearchResults = ({
  accommodations,
  pageCount,
  currentPage,
}: Props) => {
  const setSearchPagingInfo = useSearchPagingInfoSetAtom();

  useEffect(() => {
    setSearchPagingInfo({
      pageCount,
      currentPage,
    });
  }, [pageCount, currentPage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accommodations.map((accommodation) => (
        <SearchResultCard
          key={accommodation.id}
          accommodation={accommodation}
        />
      ))}
    </div>
  );
};
