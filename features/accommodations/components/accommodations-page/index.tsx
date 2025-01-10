"use client";

import { AccommodationForCard } from "@/features/accommodations/types";
import { ListPageHeader } from "@/components/shared/list-page-header";
import { AccommodationCardColumn } from "../accommodation-card-column";
import { PaginatedNavigation } from "@/components/shared/paginated-navigation";

type Props = {
  accommodations: AccommodationForCard[];
  currentPage: number;
  totalPages: number;
};

export const AccommodationsPage = ({
  accommodations,
  currentPage,
  totalPages,
}: Props) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <ListPageHeader
          title="宿泊施設一覧"
          labelForButton="宿泊施設の予約情報を登録"
          linkForButton="/accommodations/new"
        />
        <AccommodationCardColumn accommodations={accommodations} />
      </div>
      <PaginatedNavigation
        basedUrl="/accommodations"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
