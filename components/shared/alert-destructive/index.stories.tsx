import { Meta, StoryObj } from "@storybook/react";
import { AlertDestructive } from ".";

const meta: Meta<typeof AlertDestructive> = {
  component: AlertDestructive,
};
export default meta;

export const Default: StoryObj<typeof AlertDestructive> = {
  args: {
    title: "ログインに失敗しました。",
    description: "もう一度お試しいただくか、別の方法をお試しください。",
  },
  name: "表示",
};
