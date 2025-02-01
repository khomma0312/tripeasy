"use client";

import { useGetTripsSuspense } from "@/services/api/endpoints/trips/trips";
import { AccommodationForm } from "../accommodation-form";
import { convertDataTypesToMatchTrips } from "@/features/trips/utils";
import { useGetAccommodationsIdSuspense } from "@/services/api/endpoints/accommodations/accommodations";
import { useAccommodationForm } from "../../hooks/use-accommodation-form";
import { useEditAccommodation } from "../../hooks/use-edit-accommodation";

type Props = {
  id: number;
};

export const AccommodationEditFormContainer = ({ id }: Props) => {
  const { data: tripData } = useGetTripsSuspense({ page: 1, perPage: -1 });
  const { data } = useGetAccommodationsIdSuspense(id);
  const { form } = useAccommodationForm(data.accommodation);
  const { isPending, onSubmit } = useEditAccommodation(id, form);

  const trips = convertDataTypesToMatchTrips(tripData);

  return (
    <AccommodationForm
      formTitle="宿泊施設情報の編集"
      trips={trips}
      form={form}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
};
