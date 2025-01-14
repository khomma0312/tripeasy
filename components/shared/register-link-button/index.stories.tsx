import { Meta, StoryObj } from "@storybook/react";
import { RegisterLinkButton } from ".";

const meta: Meta<typeof RegisterLinkButton> = {
  component: RegisterLinkButton,
};
export default meta;

export const Default: StoryObj<typeof RegisterLinkButton> = {
  args: {},
  name: "デフォルト表示",
};
