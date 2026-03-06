import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Layout/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "まだ園が登録されていません",
    description: "「園を追加する」ボタンから、見学候補の園を追加しましょう",
  },
};

export const MessageOnly: Story = {
  args: {
    message: "データがありません",
  },
};
