"use client";

import { useGetTripsSuspense } from "@/services/api/endpoints/trips/trips";
import { AccommodationRegisterForm } from "../accommodation-register-form";
import { convertDataTypesToMatchTrips } from "@/features/trips/utils";

export const AccommodationRegisterFormContainer = () => {
  const { data } = useGetTripsSuspense({ page: 1, perPage: -1 });

  const trips = convertDataTypesToMatchTrips(data);

  return <AccommodationRegisterForm trips={trips} />;
};
