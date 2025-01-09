"use client";

import { AccommodationsPage } from "@/features/accommodations/components/accommodations-page";
import { useGetAccommodationsSuspense } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  currentPage: number;
  perPage: number | undefined;
};

export const AccommodationsPageContainer = ({
  currentPage,
  perPage,
}: Props) => {
  const { data } = useGetAccommodationsSuspense({ page: currentPage, perPage });
  return (
    <AccommodationsPage
      accommodations={data.accommodations}
      currentPage={currentPage}
      totalPages={data.totalPages}
    />
  );
};
