"use client";

import { AccommodationPage } from "@/features/accommodations/components/accommodation-page";
import { Accommodation } from "../../types";
import { useGetAccommodationsIdSuspense } from "@/services/api/endpoints/accommodations/accommodations";

type Props = {
  id: number;
};

// サンプルデータ（実際のアプリケーションではAPIから取得します）
const sampleAccommodation: Accommodation = {
  id: 1,
  tripId: 1,
  name: "グランドホテル東京",
  address: "東京都中央区銀座1-1-1",
  checkIn: "2023-07-15",
  checkOut: "2023-07-20",
  reservationPrice: 150000,
  notes: "駅から徒歩5分。東京タワーが見える部屋あり。",
  image:
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/e8/3e/a6/bathroom-attached-to.jpg?w=1200&h=-1&s=1",
  phoneNumber: "03-1234-5678",
  bookingUrl: "https://example.com/my-booking-grand-hotel-tokyo",
  tripAdvisorUrl:
    "https://www.tripadvisor.com/Hotel_Review-g1-d1-Reviews-Grand_Hotel_Tokyo-Tokyo_Tokyo_Prefecture_Kanto.html",
};

export const AccommodationPageContainer = ({ id }: Props) => {
  const { data } = useGetAccommodationsIdSuspense(id);
  return <AccommodationPage accommodation={data.accommodation} />;
};
