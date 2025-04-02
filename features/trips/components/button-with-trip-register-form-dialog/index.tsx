"use client";

import { useTripForm } from "@/features/trips/hooks/use-trip-form";
import { TripForm } from "@/features/trips/components/trip-form";
import { useAddTrip } from "@/features/trips/hooks/use-add-trip";
import {
  ButtonWithFormDialog,
  CloseButton,
} from "@/components/shared/button-with-form-dialog";

type Props = {
  className?: string;
};

export const ButtonWithTripRegisterFormDialog = ({ className }: Props) => {
  const { form } = useTripForm();
  const { isPending, onSubmit } = useAddTrip(form);

  return (
    <ButtonWithFormDialog
      buttonLabel="旅程を作成"
      dialogTitle="スケジュールを作成"
      dialogDescription="旅行の基本情報を入力してください。"
      className={className}
      Form={
        <TripForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          CloseButton={CloseButton}
        />
      }
    />
  );
};
