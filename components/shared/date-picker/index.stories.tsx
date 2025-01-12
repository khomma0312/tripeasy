import { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from ".";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
};
export default meta;

export const Default: StoryObj<typeof DatePicker> = {
  args: {
    date: new Date(),
    setDate: () => {},
  },
  name: "表示",
};
