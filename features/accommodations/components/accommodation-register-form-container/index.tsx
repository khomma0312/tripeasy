"use client";

import { useGetTripsSuspense } from "@/services/api/endpoints/trips/trips";
import { AccommodationForm } from "../accommodation-form";
import { convertDataTypesToMatchTrips } from "@/features/trips/utils";
import { useAccommodationForm } from "../../hooks/use-accommodation-form";
import { useAddAccommodation } from "../../hooks/use-add-accommodation";
import { AccommodationFormDefaultValues } from "../../types";

type Props = {
  defaultValues?: AccommodationFormDefaultValues;
};

export const AccommodationRegisterFormContainer = ({
  defaultValues,
}: Props) => {
  const { data } = useGetTripsSuspense({ page: 1, perPage: -1 });
  const { form } = useAccommodationForm(defaultValues);
  const { isPending, onSubmit } = useAddAccommodation(form);

  const trips = convertDataTypesToMatchTrips(data);

  return (
    <AccommodationForm
      formTitle="新規宿泊施設登録"
      trips={trips}
      form={form}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
};
