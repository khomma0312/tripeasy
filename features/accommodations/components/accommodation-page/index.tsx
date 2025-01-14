"use client";

import { Accommodation } from "@/features/accommodations/types";
import { AccommodationDetailCard } from "../accommodation-detail-card";
import { AccommodationPageNav } from "../accommodation-page-nav";

type Props = {
  accommodation: Accommodation;
};

export const AccommodationPage = ({ accommodation }: Props) => {
  return (
    <div className="max-w-screen-lg h-full mx-auto px-6 pt-12 pb-12">
      <AccommodationPageNav id={accommodation.id} />
      <AccommodationDetailCard accommodation={accommodation} />
    </div>
  );
};
