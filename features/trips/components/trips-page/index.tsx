"use client";

import { TripForList } from "@/features/trips/types";
import { WithPaginationLayout } from "@/components/layout/with-pagination-layout";
import { CardListColumn } from "@/components/layout/card-list-column";
import { TripCard } from "@/features/trips/components/trip-card";
import { ButtonWithTripRegisterFormDialog } from "@/features/trips/components/button-with-trip-register-form-dialog";
import { TitleHeading } from "@/components/shared/title-heading";

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
        <div className="flex justify-between items-center mb-8">
          <TitleHeading>旅程一覧</TitleHeading>
          <ButtonWithTripRegisterFormDialog />
        </div>
        <CardListColumn>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </CardListColumn>
      </div>
    </WithPaginationLayout>
  );
};
