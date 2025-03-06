import {
  ButtonWithFormDialog,
  CloseButton,
} from "@/components/shared/button-with-form-dialog";
import { useAddTripRoutePoint } from "@/features/trips/hooks/use-add-trip-route-point";
import { TripRoutePointForm } from "@/features/trips/components/trip-route-point-form";
import { useTripRoutePointForm } from "../../hooks/use-trip-route-point-form";
import { useParams } from "next/navigation";
import { useSelectedTripDayIdForRegisterAtomValue } from "../../store/selected-tripDayId-for-register";

type Props = {
  className?: string;
  name: string;
  address: string;
  latLng: { lat: number; lng: number } | undefined;
  imageUrl: string | undefined;
  buttonSize?: "sm" | "default" | "lg" | "icon" | null;
};

export const ButtonWithTripRoutePointRegisterFormDialog = ({
  className,
  name,
  address,
  latLng,
  imageUrl,
  buttonSize,
}: Props) => {
  const { id } = useParams();
  const selectedTripDayId = useSelectedTripDayIdForRegisterAtomValue();
  const { form } = useTripRoutePointForm(
    name,
    address,
    latLng,
    imageUrl,
    selectedTripDayId
  );
  const { isPending, onSubmit, formKey } = useAddTripRoutePoint(
    form,
    Number(id)
  );

  return (
    <ButtonWithFormDialog
      key={formKey}
      buttonLabel="旅程表に追加"
      dialogTitle="旅程表に追加"
      dialogDescription="旅行地点に関する情報を入力してください。"
      className={className}
      buttonSize={buttonSize}
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
