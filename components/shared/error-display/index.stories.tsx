import { Meta, StoryObj } from "@storybook/react";
import { ErrorDisplay } from ".";

const meta: Meta<typeof ErrorDisplay> = {
  component: ErrorDisplay,
};
export default meta;

export const Default: StoryObj<typeof ErrorDisplay> = {
  args: {},
  name: "表示",
};
