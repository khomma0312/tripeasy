"use client";

import { AccommodationsSearchResults } from "../accommodations-search-results";
import { useGetAccommodationsSearchSuspense } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  lat: string;
  lng: string;
  page: string | undefined;
};

export const AccommodationsSearchResultsContainer = ({
  lat: latStr,
  lng: lngStr,
  page: pageStr,
}: Props) => {
  const lat = Number(latStr);
  const lng = Number(lngStr);
  const page = pageStr ? Number(pageStr) : 1;

  const { data } = useGetAccommodationsSearchSuspense({ lat, lng, page });

  return (
    <AccommodationsSearchResults
      accommodations={data.accommodations}
      currentPage={data.currentPage}
      pageCount={data.pageCount}
    />
  );
};
