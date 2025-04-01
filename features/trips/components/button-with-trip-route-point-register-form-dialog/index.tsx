import {
  ButtonWithFormDialog,
  CloseButton,
} from "@/components/shared/button-with-form-dialog";
import { useAddTripRoutePoint } from "@/features/trips/hooks/use-add-trip-route-point";
import { TripRoutePointRegisterForm } from "@/features/trips/components/trip-route-point-register-form";
import { useTripRoutePointRegisterForm } from "@/features/trips/hooks/use-trip-route-point-register-form";
import { useParams } from "next/navigation";
import { useSelectedTripDayIdForRegisterAtomValue } from "../../store/selected-tripDayId-for-register";
import { TripRoutePointPlaceType } from "../../types";

type Props = {
  className?: string;
  name: string;
  address: string;
  latLng: { lat: number; lng: number } | undefined;
  imageUrl: string | undefined;
  buttonSize?: "sm" | "default" | "lg" | "icon" | null;
  placeType?: TripRoutePointPlaceType;
};

export const ButtonWithTripRoutePointRegisterFormDialog = ({
  className,
  name,
  address,
  latLng,
  imageUrl,
  buttonSize,
  placeType = "destination",
}: Props) => {
  const { id } = useParams();
  const selectedTripDayId = useSelectedTripDayIdForRegisterAtomValue();
  const { form } = useTripRoutePointRegisterForm(
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
        <TripRoutePointRegisterForm
          form={form}
          isPending={isPending}
          placeType={placeType}
          onSubmit={onSubmit}
          CloseButton={CloseButton}
        />
      }
    />
  );
};
