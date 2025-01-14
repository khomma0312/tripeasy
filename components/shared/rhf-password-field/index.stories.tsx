import { Meta, StoryObj } from "@storybook/react";
import { RHFPasswordField } from ".";
import { withRHFDecorator } from "@/lib/storybook/decorators";

const meta: Meta<typeof RHFPasswordField> = {
  component: RHFPasswordField,
  decorators: [withRHFDecorator()],
};
export default meta;

export const Default: StoryObj<typeof RHFPasswordField> = {
  args: {
    name: "password",
    label: "パスワード",
  },
  name: "デフォルト表示",
};
