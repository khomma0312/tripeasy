import { AccommodationForCard } from "@/features/accommodations/types";
import { AccommodationCard } from "@/features/accommodations/components/accommodation-card";

type Props = {
  accommodations: AccommodationForCard[];
};

export const AccommodationCardColumn = ({ accommodations }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {accommodations.map((accommodation) => (
        <AccommodationCard
          key={accommodation.id}
          accommodation={accommodation}
        />
      ))}
    </div>
  );
};
