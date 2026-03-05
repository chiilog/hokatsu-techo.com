import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteNurseryDialog } from "./DeleteNurseryDialog";

const meta = {
	title: "Nursery/DeleteNurseryDialog",
	component: DeleteNurseryDialog,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		open: true,
		nurseryName: "さくら保育園",
		onConfirm: () => {},
		onCancel: () => {},
	},
} satisfies Meta<typeof DeleteNurseryDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
