import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NurseryForm } from "./NurseryForm";

const meta = {
  title: "Nursery/NurseryForm",
  component: NurseryForm,
  parameters: {
    layout: "padded",
  },
  args: {
    onAdd: () => {},
  },
} satisfies Meta<typeof NurseryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
