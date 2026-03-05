import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VisitTipsDialog } from "./VisitTipsDialog";

const meta = {
	title: "Nursery/VisitTipsDialog",
	component: VisitTipsDialog,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		open: true,
		onClose: () => {},
	},
} satisfies Meta<typeof VisitTipsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
