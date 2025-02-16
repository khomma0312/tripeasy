"use client";

import { TripPage } from "@/features/trips/components/trip-page";
import { useGetTripsIdSuspense } from "@/services/api/endpoints/trips/trips";

type Props = {
  id: number;
};

export const TripPageContainer = ({ id }: Props) => {
  const { data } = useGetTripsIdSuspense(id);
  return <TripPage trip={data.trip} />;
};
