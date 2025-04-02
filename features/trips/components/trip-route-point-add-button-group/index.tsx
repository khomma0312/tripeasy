import { PlusIcon, SearchIcon } from "lucide-react";
import { TripRoutePointAddButton } from "@/features/trips/components/trip-route-point-add-button";
import { useIsDestinationSearchOpenSetAtom } from "@/features/trips/store/is-destination-search-open";
import { useSelectedTripDayIdForRegisterSetAtom } from "@/features/trips/store/selected-tripDayId-for-register";
import { TripRoutePointAccommodationAddButton } from "@/features/trips/components/trip-route-point-accommodation-add-button";
import { useSearchPlaceTypeSetAtom } from "@/features/trips/store/search-place-type";

type Props = {
  tripDayId: number;
};

export const TripRoutePointAddButtonGroup = ({ tripDayId }: Props) => {
  const setIsDestinationSearchOpen = useIsDestinationSearchOpenSetAtom();
  const setSelectedTripDayIdForRegister =
    useSelectedTripDayIdForRegisterSetAtom();
  const setSearchPlaceType = useSearchPlaceTypeSetAtom();

  return (
    <div className="flex justify-center gap-10">
      <TripRoutePointAddButton
        icon={<PlusIcon />}
        onClick={() => {
          setIsDestinationSearchOpen(true);
          setSearchPlaceType("destination");
          setSelectedTripDayIdForRegister(tripDayId);
        }}
        label="予定を追加"
      />
      <TripRoutePointAccommodationAddButton
        menuItems={[
          {
            icon: <SearchIcon />,
            label: "宿泊先を検索",
            onClick: () => {
              setIsDestinationSearchOpen(true);
              setSearchPlaceType("accommodation");
              setSelectedTripDayIdForRegister(tripDayId);
            },
          },
          {
            icon: <PlusIcon />,
            label: "保存済みの宿泊施設から追加",
            isDialogTrigger: true,
            onClick: () => {
              setSelectedTripDayIdForRegister(tripDayId);
            },
          },
        ]}
      />
    </div>
  );
};
