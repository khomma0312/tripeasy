import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import mockRouter from "next-router-mock";
import { PaginatedNavigation } from ".";

const meta: Meta<typeof PaginatedNavigation> = {
  component: PaginatedNavigation,
};
export default meta;

export const Default: StoryObj<typeof PaginatedNavigation> = {
  beforeEach: () => {
    mockRouter.setCurrentUrl("/todo-lists");
  },
  args: {
    basedUrl: "/todo-lists",
    currentPage: 1,
    totalPages: 10,
  },
  name: "表示",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(mockRouter).toMatchObject({ pathname: "/todo-lists" });
    const selectedPage = canvas.getByRole("link", { name: "2" });
    await userEvent.click(selectedPage);
    await expect(mockRouter).toMatchObject({
      pathname: "/todo-lists",
      query: { page: "2" },
    });
  },
};
