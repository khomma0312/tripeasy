import { Meta, StoryObj } from "@storybook/react";
import { RHFInputField } from ".";
import { withRHFDecorator } from "@/lib/storybook/decorators";

const meta: Meta<typeof RHFInputField> = {
  component: RHFInputField,
  decorators: [withRHFDecorator()],
};
export default meta;

export const Default: StoryObj<typeof RHFInputField> = {
  args: {
    name: "name",
    label: "名前",
  },
  name: "表示",
};
