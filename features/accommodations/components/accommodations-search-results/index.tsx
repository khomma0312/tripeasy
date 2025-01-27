import { SearchResultCard } from "../search-result-card";
import { AccommodationForSearchResult } from "../../types";

type Props = {
  accommodations: AccommodationForSearchResult[];
};

export const AccommodationsSearchResults = ({ accommodations }: Props) => {
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
