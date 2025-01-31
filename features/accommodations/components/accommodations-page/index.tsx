"use client";

import { AccommodationForCard } from "@/features/accommodations/types";
import { ListPageHeader } from "@/components/shared/list-page-header";
import { AccommodationCardColumn } from "../accommodation-card-column";
import { WithPaginationLayout } from "@/components/layout/with-pagination-layout";
import { SquareArrowOutUpRight } from "lucide-react";
import { ButtonWithLink } from "@/components/shared/button-with-link";

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
    <WithPaginationLayout
      baseUrl="/accommodations"
      currentPage={currentPage}
      totalPages={totalPages}
    >
      <div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <ListPageHeader
            title="宿泊施設一覧"
            labelForButton="予約情報を登録"
            linkForButton="/accommodations/new"
          />
          <ButtonWithLink
            href="/accommodations/search"
            label="施設を検索"
            Icon={SquareArrowOutUpRight}
            variant="outline"
          />
        </div>
        <AccommodationCardColumn accommodations={accommodations} />
      </div>
    </WithPaginationLayout>
  );
};
