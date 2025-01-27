import { AccommodationsSearchResults } from "../accommodations-search-results";
import { useGetAccommodationsSearchSuspense } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  lat: string;
  lng: string;
};

export const AccommodationsSearchResultsContainer = ({
  lat: latStr,
  lng: lngStr,
}: Props) => {
  const lat = Number(latStr);
  const lng = Number(lngStr);

  const { data } = useGetAccommodationsSearchSuspense({ lat, lng });

  return <AccommodationsSearchResults accommodations={data.accommodations} />;
};
