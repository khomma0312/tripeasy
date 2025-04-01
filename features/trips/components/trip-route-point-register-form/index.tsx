"use client";

import { Form } from "@/components/shadcn/form";
import { RHFInputField } from "@/components/shared/rhf-input-field";
import {
  TripRoutePointFormDestinationFieldValues,
  TripRoutePointFormFieldValues,
  TripRoutePointPlaceType,
} from "@/features/trips/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import { RHFTimeSelectField } from "@/components/shared/rhf-time-select-field";

type Props = {
  form: UseFormReturn<TripRoutePointFormDestinationFieldValues>;
  placeType: TripRoutePointPlaceType;
  isPending: boolean;
  onSubmit: (trip: TripRoutePointFormFieldValues) => void;
  RegisterButton?: React.ComponentType;
  CloseButton?: React.ComponentType;
};

export const TripRoutePointRegisterForm = ({
  form,
  placeType,
  onSubmit,
  RegisterButton,
  CloseButton,
}: Props) => {
  const arrivalTime = form.watch("arrivalTime");
  const [arrivalTimeHour, arrivalTimeMinute] = arrivalTime?.split(":") || [];
  const arrivalTimeObj = {
    hour: arrivalTimeHour ? parseInt(arrivalTimeHour, 10) : 0,
    minute: arrivalTimeMinute ? parseInt(arrivalTimeMinute, 10) : 0,
  };

  const onValid = (values: TripRoutePointFormDestinationFieldValues) => {
    if (placeType === "destination") {
      onSubmit({ destination: values });
    }

    if (placeType === "accommodation") {
      onSubmit({ accommodation: values });
    }
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
              <RHFInputField
                control={form.control}
                name="name"
                label="目的地名"
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
                  form.setValue("arrivalTime", `${hour}:${minute}`);
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
                  form.setValue("departureTime", `${hour}:${minute}`);
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
