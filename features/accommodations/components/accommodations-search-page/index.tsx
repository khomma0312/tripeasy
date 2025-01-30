"use client";

import { Suspense } from "react";
import { AccommodationsSearchResultsContainer } from "../accommodations-search-results-container";
import { CenteredLoaderCircle } from "@/components/shared/centered-loader-circle";
import { TitleHeading } from "@/components/shared/title-heading";
import { WithPaginationLayout } from "@/components/layout/with-pagination-layout";
import { AccommodationsSearchForm } from "../accommodations-search-form";
import { useSearchPagingInfoAtomValue } from "@/features/accommodations/store/search-paging-info";

type Props = {
  lat: string | undefined;
  lng: string | undefined;
  page: string | undefined;
};

export const AccommodationsSearchPage = ({ lat, lng, page }: Props) => {
  const searchPagingInfo = useSearchPagingInfoAtomValue();

  return (
    <div className="w-[90%] mx-auto py-12">
      <WithPaginationLayout
        baseUrl="/accommodations/search"
        currentPage={searchPagingInfo.currentPage}
        totalPages={searchPagingInfo.pageCount}
      >
        <div>
          <TitleHeading className="text-left mb-5">宿泊施設を検索</TitleHeading>
          <AccommodationsSearchForm />
          {lat && lng && (
            <Suspense fallback={<CenteredLoaderCircle />}>
              <AccommodationsSearchResultsContainer
                lat={lat}
                lng={lng}
                page={page}
              />
            </Suspense>
          )}
        </div>
      </WithPaginationLayout>
    </div>
  );
};
