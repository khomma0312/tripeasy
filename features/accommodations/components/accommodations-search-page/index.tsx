"use client";

import { Suspense } from "react";
import { AccommodationsSearchResultsContainer } from "../accommodations-search-results-container";
import { CenteredLoaderCircle } from "@/components/shared/centered-loader-circle";
import { TitleHeading } from "@/components/shared/title-heading";
import { WithPaginationLayout } from "@/components/layout/with-pagination-layout";
import { AccommodationsSearchForm } from "../accommodations-search-form";

type Props = {
  lat: string | undefined;
  lng: string | undefined;
};

export const AccommodationsSearchPage = ({ lat, lng }: Props) => {
  return (
    <WithPaginationLayout
      baseUrl="/accommodations/search"
      currentPage={1}
      totalPages={3}
    >
      <div>
        <TitleHeading>宿泊施設を検索</TitleHeading>
        <AccommodationsSearchForm />
        {lat && lng && (
          <Suspense fallback={<CenteredLoaderCircle />}>
            <AccommodationsSearchResultsContainer lat={lat} lng={lng} />
          </Suspense>
        )}
      </div>
    </WithPaginationLayout>
  );
};
