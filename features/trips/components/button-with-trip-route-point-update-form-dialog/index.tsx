"use client";

import {
  ButtonWithFormDialog,
  CloseButton,
} from "@/components/shared/button-with-form-dialog";
import { Pencil } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/shadcn/button";
import { useTripRoutePointUpdateForm } from "../../hooks/use-trip-route-point-update-form";
import { useUpdateTripRoutePoint } from "../../hooks/use-update-trip-route-point";
import { useParams } from "next/navigation";
import { TripRoutePointUpdateForm } from "../trip-route-point-update-form";
import { TripRoutePointPlaceType } from "../../types";

type Props = {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  tripRoutePointId: number;
  name: string;
  arrivalTime: string;
  departureTime: string;
  placeType: TripRoutePointPlaceType;
};

export const ButtonWithTripRoutePointUpdateFormDialog = ({
  variant,
  size,
  className,
  tripRoutePointId,
  name,
  arrivalTime,
  departureTime,
  placeType = "destination",
}: Props) => {
  const { id } = useParams();
  const { form } = useTripRoutePointUpdateForm(
    tripRoutePointId,
    name,
    arrivalTime,
    departureTime
  );
  const { isPending, onSubmit, formKey } = useUpdateTripRoutePoint(
    form,
    Number(id)
  );

  return (
    <ButtonWithFormDialog
      key={formKey}
      buttonLabel="目的地情報の変更"
      buttonIcon={<Pencil />}
      dialogTitle="目的地情報を編集"
      dialogDescription="目的地情報を入力してください。"
      className={className}
      variant={variant}
      buttonSize={size}
      Form={
        <TripRoutePointUpdateForm
          form={form}
          placeType={placeType}
          isPending={isPending}
          onSubmit={onSubmit}
          CloseButton={CloseButton}
        />
      }
    />
  );
};
