import { Meta, StoryObj } from "@storybook/react";
import { TitleHeading } from ".";

const meta: Meta<typeof TitleHeading> = {
  component: TitleHeading,
};
export default meta;

export const Default: StoryObj<typeof TitleHeading> = {
  args: {
    children: "タイトル",
  },
  name: "デフォルト表示",
};
