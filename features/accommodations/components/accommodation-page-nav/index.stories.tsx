import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import mockRouter from "next-router-mock";
import { AccommodationPageNav } from ".";

const meta: Meta<typeof AccommodationPageNav> = {
  component: AccommodationPageNav,
};
export default meta;

export const Default: StoryObj<typeof AccommodationPageNav> = {
  args: {
    id: 1,
  },
  name: "デフォルト表示",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const editButton = canvas.getByRole("button", { name: "編集" });
    await userEvent.click(editButton);
    expect(mockRouter).toMatchObject({
      pathname: `/accommodations/${args.id}/edit`,
    });

    const backButton = canvas.getByRole("button", { name: "一覧に戻る" });
    await userEvent.click(backButton);
    expect(mockRouter).toMatchObject({
      pathname: `/accommodations`,
    });
  },
};
