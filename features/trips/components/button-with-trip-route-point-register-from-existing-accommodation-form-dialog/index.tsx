import { useParams } from "next/navigation";
import { TripRoutePointRegisterFromExistingAccommodationForm } from "@/features/trips/components/trip-route-point-register-from-existing-accommodation-form";
import { useSelectedTripDayIdForRegisterAtomValue } from "../../store/selected-tripDayId-for-register";
import {
  CloseButton,
  DropdownWithFormDialog,
  MenuItem,
} from "@/components/shared/dropdown-with-form-dialog";
import { useAddTripRoutePoint } from "@/features/trips/hooks/use-add-trip-route-point";
import { useTripRoutePointRegisterFromExistingAccommodationForm } from "@/features/trips/hooks/use-trip-route-point-register-from-existing-accommodation-form";
import { useGetAccommodations } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  menuItems: MenuItem[];
  DropdownTrigger: React.ReactNode;
};

export const ButtonWithTripRoutePointRegisterFromExistingAccommodationFormDialog =
  ({ menuItems, DropdownTrigger }: Props) => {
    const { id } = useParams();
    const selectedTripDayId = useSelectedTripDayIdForRegisterAtomValue();
    const { form } =
      useTripRoutePointRegisterFromExistingAccommodationForm(selectedTripDayId);
    const { isPending, onSubmit, formKey } = useAddTripRoutePoint(
      form,
      Number(id)
    );
    const { data } = useGetAccommodations({
      page: 1,
      perPage: -1,
    });

    return (
      <DropdownWithFormDialog
        key={formKey}
        dialogTitle="旅程表に追加"
        dialogDescription="旅行地点に関する情報を入力してください。"
        menuItems={menuItems}
        DropdownTrigger={DropdownTrigger}
        Form={
          <TripRoutePointRegisterFromExistingAccommodationForm
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
            CloseButton={CloseButton}
            accommodations={data?.accommodations ?? []}
          />
        }
      />
    );
  };
