"use client";

import { TripForList } from "@/features/trips/types";
import { WithPaginationLayout } from "@/components/layout/with-pagination-layout";
import { CardListColumn } from "@/components/layout/card-list-column";
import { ListPageHeader } from "@/components/shared/list-page-header";
import { TripCard } from "@/features/trips/components/trip-card";

type Props = {
  trips: TripForList[];
  currentPage: number;
  totalPages: number;
};

export const TripsPage = ({ trips, currentPage, totalPages }: Props) => {
  return (
    <WithPaginationLayout
      baseUrl="/trips"
      currentPage={currentPage}
      totalPages={totalPages}
    >
      <div>
        <ListPageHeader
          title="旅程一覧"
          labelForButton="旅程を登録"
          linkForButton="/trips/new"
        />
        <CardListColumn>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </CardListColumn>
      </div>
    </WithPaginationLayout>
  );
};
