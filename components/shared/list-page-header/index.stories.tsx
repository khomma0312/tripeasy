import { Meta, StoryObj } from "@storybook/react";
import { ListPageHeader } from ".";

const meta: Meta<typeof ListPageHeader> = {
  component: ListPageHeader,
};
export default meta;

export const Default: StoryObj<typeof ListPageHeader> = {
  args: {
    title: "宿泊予約一覧",
    labelForButton: "宿泊予約情報を追加",
    linkForButton: "/",
  },
  name: "デフォルト表示",
};
