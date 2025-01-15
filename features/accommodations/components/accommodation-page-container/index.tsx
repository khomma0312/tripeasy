"use client";

import { AccommodationPage } from "@/features/accommodations/components/accommodation-page";
import { useGetAccommodationsIdSuspense } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  id: number;
};

export const AccommodationPageContainer = ({ id }: Props) => {
  const { data } = useGetAccommodationsIdSuspense(id);
  return <AccommodationPage accommodation={data.accommodation} />;
};
