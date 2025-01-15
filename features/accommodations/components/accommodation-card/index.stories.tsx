import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import mockRouter from "next-router-mock";
import { AccommodationCard } from ".";

const meta: Meta<typeof AccommodationCard> = {
  component: AccommodationCard,
};
export default meta;

const mockAccommodation = {
  id: 1,
  name: "テストホテル",
  checkIn: "2024-12-01",
  checkOut: "2024-12-31",
  image: "/dummy.jpg",
  address: "東京都新宿区1-2-3",
  bookingUrl: "https://example.com/booking",
  bookingId: "ABC123",
};

export const Default: StoryObj<typeof AccommodationCard> = {
  args: {
    accommodation: mockAccommodation,
  },
  name: "デフォルト表示",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const detailedPageLink = canvas.getByRole("link", { name: "詳細を見る" });
    await userEvent.click(detailedPageLink);
    await expect(mockRouter).toMatchObject({
      pathname: `/accommodations/${mockAccommodation.id}`,
    });
  },
};

export const WithoutBookingId: StoryObj<typeof AccommodationCard> = {
  name: "予約番号なし",
  args: {
    accommodation: { ...mockAccommodation, bookingId: undefined },
  },
};
