import { useAddTripRoutePoint } from "@/features/trips/hooks/use-add-trip-route-point";
import { TripRoutePointForm } from "@/features/trips/components/trip-route-point-form";
import { useTripRoutePointForm } from "../../hooks/use-trip-route-point-form";
import { useParams } from "next/navigation";
import { useSelectedTripDayIdForRegisterAtomValue } from "../../store/selected-tripDayId-for-register";
import {
  CloseButton,
  DropdownWithFormDialog,
  MenuItem,
} from "@/components/shared/dropdown-with-form-dialog";

type Props = {
  menuItems: MenuItem[];
  DropdownTrigger: React.ReactNode;
};

export const ButtonDropdownWithTripRoutePointRegisterFormDialog = ({
  menuItems,
  DropdownTrigger,
}: Props) => {
  const { id } = useParams();
  const selectedTripDayId = useSelectedTripDayIdForRegisterAtomValue();
  const { form } = useTripRoutePointForm(
    "test",
    "test",
    undefined,
    undefined,
    selectedTripDayId
  );
  const { isPending, onSubmit, formKey } = useAddTripRoutePoint(
    form,
    Number(id)
  );

  return (
    <DropdownWithFormDialog
      key={formKey}
      dialogTitle="旅程表に追加"
      dialogDescription="旅行地点に関する情報を入力してください。"
      menuItems={menuItems}
      DropdownTrigger={DropdownTrigger}
      Form={
        <TripRoutePointForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          CloseButton={CloseButton}
        />
      }
    />
  );
};
