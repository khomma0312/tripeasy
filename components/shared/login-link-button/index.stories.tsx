import { Meta, StoryObj } from "@storybook/react";
import { LoginLinkButton } from ".";

const meta: Meta<typeof LoginLinkButton> = {
  component: LoginLinkButton,
};
export default meta;

export const Default: StoryObj<typeof LoginLinkButton> = {
  args: {},
  name: "表示",
};
