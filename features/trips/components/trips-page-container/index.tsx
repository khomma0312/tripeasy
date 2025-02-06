"use client";

import { TripsPage } from "@/features/trips/components/trips-page";
import { useGetTripsSuspense } from "@/services/api/endpoints/trips/trips";

type Props = {
  currentPage: number;
  perPage: number | undefined;
};

export const TripsPageContainer = ({ currentPage, perPage }: Props) => {
  const { data } = useGetTripsSuspense({ page: currentPage, perPage });
  return (
    <TripsPage
      trips={data.trips}
      currentPage={currentPage}
      totalPages={data.totalPages}
    />
  );
};
