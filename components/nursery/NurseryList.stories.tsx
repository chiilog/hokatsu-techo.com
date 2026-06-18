import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NurseryList } from "./NurseryList";

const meta = {
  title: "Nursery/NurseryList",
  component: NurseryList,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NurseryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNurseries: Story = {
  args: {
    nurseries: [
      {
        id: "1",
        name: "さくら保育園",
        visitDate: "2026-04-15",
        memo: "",
        createdAt: "2026-03-01T00:00:00.000Z",
        updatedAt: "2026-03-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "ひまわり保育園",
        visitDate: null,
        memo: "駅から近い",
        createdAt: "2026-03-02T00:00:00.000Z",
        updatedAt: "2026-03-02T00:00:00.000Z",
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    nurseries: [],
  },
};
