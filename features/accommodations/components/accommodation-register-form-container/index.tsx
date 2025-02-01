"use client";

import { useGetTripsSuspense } from "@/services/api/endpoints/trips/trips";
import { AccommodationForm } from "../accommodation-form";
import { convertDataTypesToMatchTrips } from "@/features/trips/utils";
import { useSearchParams } from "next/navigation";
import { AccommodationForSearchResult } from "../../types";

export const AccommodationRegisterFormContainer = () => {
  const { data } = useGetTripsSuspense({ page: 1, perPage: -1 });
  const searchParams = useSearchParams();

  const trips = convertDataTypesToMatchTrips(data);

  const encodedJsonStr = searchParams.get("data");
  const jsonStr = encodedJsonStr
    ? decodeURIComponent(encodedJsonStr)
    : undefined;
  const autoCompleteFormData: AccommodationForSearchResult | undefined = jsonStr
    ? JSON.parse(jsonStr)
    : undefined;

  return (
    <AccommodationForm trips={trips} defaultValues={autoCompleteFormData} />
  );
};
