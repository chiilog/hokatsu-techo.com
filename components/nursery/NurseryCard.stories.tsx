import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NurseryCard } from "./NurseryCard";

const meta = {
	title: "Nursery/NurseryCard",
	component: NurseryCard,
	parameters: {
		layout: "padded",
	},
} satisfies Meta<typeof NurseryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDate: Story = {
	args: {
		nursery: {
			id: "1",
			name: "さくら保育園",
			visitDate: "2026-04-15",
			memo: "",
			createdAt: "2026-03-01T00:00:00.000Z",
			updatedAt: "2026-03-01T00:00:00.000Z",
		},
	},
};

export const WithoutDate: Story = {
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

export const WithMemo: Story = {
	args: {
		nursery: {
			id: "3",
			name: "たんぽぽ保育園",
			visitDate: "2026-05-01",
			memo: "園庭が広くて明るい雰囲気。先生たちがとても丁寧で、子どもたちが楽しそうに遊んでいた。給食は自園調理で、アレルギー対応もしっかりしていた。",
			createdAt: "2026-03-01T00:00:00.000Z",
			updatedAt: "2026-03-01T00:00:00.000Z",
		},
	},
};
