"use client";

import { useGetTripsSuspense } from "@/services/api/endpoints/trips/trips";
import { AccommodationForm } from "../accommodation-form";
import { convertDataTypesToMatchTrips } from "@/features/trips/utils";
import { useGetAccommodationsIdSuspense } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  id: number;
};

export const AccommodationEditFormContainer = ({ id }: Props) => {
  const { data: tripData } = useGetTripsSuspense({ page: 1, perPage: -1 });
  const { data } = useGetAccommodationsIdSuspense(id);

  const trips = convertDataTypesToMatchTrips(tripData);

  return <AccommodationForm trips={trips} defaultValues={data.accommodation} />;
};
