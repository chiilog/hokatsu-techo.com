import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NurseryDetail } from "./NurseryDetail";

const meta = {
  title: "Nursery/NurseryDetail",
  component: NurseryDetail,
  parameters: {
    layout: "padded",
  },
  args: {
    onUpdate: () => {},
    onVisitTipsClick: () => {},
  },
} satisfies Meta<typeof NurseryDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMemo: Story = {
  args: {
    nursery: {
      id: "1",
      name: "さくら保育園",
      visitDate: "2026-04-15",
      memo: "園庭が広くて明るい雰囲気。先生たちがとても丁寧。",
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
  },
};

export const WithoutMemo: Story = {
  args: {
    nursery: {
      id: "2",
      name: "ひまわり保育園",
      visitDate: null,
      memo: "",
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: "2026-03-01T00:00:00.000Z",
    },
  },
};
