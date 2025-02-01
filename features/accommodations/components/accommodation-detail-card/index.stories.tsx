import { Meta, StoryObj } from "@storybook/react";
import { AccommodationDetailCard } from ".";

const meta: Meta<typeof AccommodationDetailCard> = {
  component: AccommodationDetailCard,
};
export default meta;

const mockAccommodation = {
  id: 1,
  name: "テストホテル",
  checkIn: "2024-12-01",
  checkOut: "2024-12-31",
  reservationPrice: 50000,
  tripId: 1,
  image: "/dummy.jpg",
  address: "東京都新宿区1-2-3",
  notes: "テスト備考",
  bookingUrl: "https://example.com/booking",
  informationUrl:
    "https://www.tripadvisor.com/Hotel_Review-g2-d2-Reviews-Kyoto_Riverside_Inn-Kyoto_Kyoto_Prefecture_Kinki.html",
  phoneNumber: "03-0000-0000",
  bookingId: "ABC123",
};

export const Default: StoryObj<typeof AccommodationDetailCard> = {
  args: {
    accommodation: mockAccommodation,
  },
  name: "デフォルト表示",
};

export const WithLongNotes: StoryObj<typeof AccommodationDetailCard> = {
  name: "備考が長い文章の場合",
  args: {
    accommodation: {
      ...mockAccommodation,
      notes:
        "お客様のご要望により、お部屋をシティビューの高層階に変更いたしました。チェックイン時に無料のウェルカムドリンクをご用意しております。また、滞在中にご利用いただけるスパ割引券（20%オフ）をフロントにてお渡しいたします。ご不明な点がございましたら、いつでもコンシェルジュにお問い合わせください。",
    },
  },
};

export const OptionalFieldNotFilled: StoryObj<typeof AccommodationDetailCard> =
  {
    name: "任意項目に入力がない場合",
    args: {
      accommodation: {
        ...mockAccommodation,
        reservationPrice: undefined,
        address: undefined,
        notes: undefined,
        bookingUrl: undefined,
        informationUrl: undefined,
        phoneNumber: undefined,
        bookingId: undefined,
      },
    },
  };
