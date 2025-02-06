import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import mockRouter from "next-router-mock";
import { TripCard } from ".";

const meta: Meta<typeof TripCard> = {
  component: TripCard,
};
export default meta;

const mockAccommodation = {
  id: 1,
  title: "テストホテル",
  image: "/dummy.jpg",
  destination: "東京都新宿",
  startDate: "2024-12-01",
  endDate: "2024-12-31",
};

export const Default: StoryObj<typeof TripCard> = {
  args: {
    trip: mockAccommodation,
  },
  name: "デフォルト表示",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const detailedPageLink = canvas.getByRole("link", { name: "詳細を見る" });
    await userEvent.click(detailedPageLink);
    await expect(mockRouter).toMatchObject({
      pathname: `/trips/${mockAccommodation.id}`,
    });
  },
};
