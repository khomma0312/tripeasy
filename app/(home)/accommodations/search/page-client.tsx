"use client";

import { HandleError } from "@/components/shared/handle-error";
import { AccommodationsSearchPage } from "@/features/accommodations/components/accommodations-search-page";

type Props = {
  lat: string | undefined;
  lng: string | undefined;
  page: string | undefined;
};

export const PageClient = ({ lat, lng, page }: Props) => {
  return (
    <HandleError onReset={() => window.location.reload()}>
      <AccommodationsSearchPage lat={lat} lng={lng} page={page} />
    </HandleError>
  );
};
