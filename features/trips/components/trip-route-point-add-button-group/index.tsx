import { BedDoubleIcon, PlusIcon } from "lucide-react";
import { TripRoutePointAddButton } from "@/features/trips/components/trip-route-point-add-button";
import { useIsDestinationSearchOpenSetAtom } from "@/features/trips/store/is-destination-search-open";

export const TripRoutePointAddButtonGroup = () => {
  const setIsDestinationSearchOpen = useIsDestinationSearchOpenSetAtom();

  return (
    <div className="flex justify-center gap-10">
      <TripRoutePointAddButton
        icon={<PlusIcon />}
        onClick={() => {
          setIsDestinationSearchOpen(true);
        }}
        label="予定を追加"
      />
      <TripRoutePointAddButton
        icon={<BedDoubleIcon />}
        onClick={() => {}}
        label="宿泊予定を追加"
      />
    </div>
  );
};
