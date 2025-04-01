"use client";

import { Form } from "@/components/shadcn/form";
import {
  TripRoutePointFormAccommodationFieldValues,
  TripRoutePointFormFieldValues,
} from "@/features/trips/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import { RHFTimeSelectField } from "@/components/shared/rhf-time-select-field";
import { AccommodationForCard } from "@/features/accommodations/types";
import { RHFComboboxField } from "@/components/shared/rhf-combobox-field";

type Props = {
  form: UseFormReturn<TripRoutePointFormAccommodationFieldValues>;
  isPending: boolean;
  onSubmit: (trip: TripRoutePointFormFieldValues) => void;
  RegisterButton?: React.ComponentType;
  CloseButton?: React.ComponentType;
  accommodations: AccommodationForCard[];
};

export const TripRoutePointRegisterFromExistingAccommodationForm = ({
  form,
  onSubmit,
  RegisterButton,
  CloseButton,
  accommodations,
}: Props) => {
  const arrivalTime = form.watch("arrivalTime");
  const [arrivalTimeHour, arrivalTimeMinute] = arrivalTime?.split(":") || [];
  const arrivalTimeObj = {
    hour: arrivalTimeHour ? parseInt(arrivalTimeHour, 10) : 0,
    minute: arrivalTimeMinute ? parseInt(arrivalTimeMinute, 10) : 0,
  };

  const accommodationItems = accommodations.map((accommodation) => ({
    value: accommodation.id.toString(),
    label: accommodation.name,
  }));

  const onValid = (
    accommodation: TripRoutePointFormAccommodationFieldValues
  ) => {
    onSubmit({
      accommodation: {
        ...accommodation,
        accommodationId: Number(accommodation.accommodationId),
      },
    });
  };

  return (
    <div className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid)}
          className="space-y-6 bg-white p-6"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <RHFComboboxField
                control={form.control}
                name="accommodationId"
                label="宿泊施設"
                items={accommodationItems}
                isRequired
              />
            </div>
            <div className="flex items-center gap-2">
              <RHFTimeSelectField
                control={form.control}
                name="arrivalTime"
                label="到着時間"
                defaultHour={9}
                defaultMinute={0}
                isRequired
                onChange={(hour, minute) => {
                  const hourStr = String(hour).padStart(2, "0");
                  const minuteStr = String(minute).padStart(2, "0");
                  form.setValue("arrivalTime", `${hourStr}:${minuteStr}`);
                }}
              />
              <RHFTimeSelectField
                control={form.control}
                name="departureTime"
                label="出発時間"
                defaultHour={10}
                defaultMinute={0}
                comparedTime={arrivalTimeObj}
                isRequired
                onChange={(hour, minute) => {
                  const hourStr = String(hour).padStart(2, "0");
                  const minuteStr = String(minute).padStart(2, "0");
                  form.setValue("departureTime", `${hourStr}:${minuteStr}`);
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {RegisterButton ? (
              <RegisterButton />
            ) : (
              <Button type="submit">作成する</Button>
            )}
            {CloseButton ? (
              <CloseButton />
            ) : (
              <Button variant="outline">キャンセル</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
