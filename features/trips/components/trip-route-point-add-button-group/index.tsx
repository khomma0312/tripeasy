import { BedDoubleIcon, PlusIcon } from "lucide-react";
import { TripRoutePointAddButton } from "@/features/trips/components/trip-route-point-add-button";
import { useIsDestinationSearchOpenSetAtom } from "@/features/trips/store/is-destination-search-open";
import { useSelectedTripDayIdForRegisterSetAtom } from "../../store/selected-tripDayId-for-register";

type Props = {
  tripDayId: number;
};

export const TripRoutePointAddButtonGroup = ({ tripDayId }: Props) => {
  const setIsDestinationSearchOpen = useIsDestinationSearchOpenSetAtom();
  const setSelectedTripDayIdForRegister =
    useSelectedTripDayIdForRegisterSetAtom();

  return (
    <div className="flex justify-center gap-10">
      <TripRoutePointAddButton
        icon={<PlusIcon />}
        onClick={() => {
          setIsDestinationSearchOpen(true);
          setSelectedTripDayIdForRegister(tripDayId);
        }}
        label="予定を追加"
      />
      <TripRoutePointAddButton
        icon={<BedDoubleIcon />}
        onClick={() => {
          setSelectedTripDayIdForRegister(tripDayId);
        }}
        label="宿泊予定を追加"
      />
    </div>
  );
};
