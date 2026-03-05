import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OnboardingDialog } from "./OnboardingDialog";

const meta = {
	title: "Onboarding/OnboardingDialog",
	component: OnboardingDialog,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		open: true,
		onClose: () => {},
	},
} satisfies Meta<typeof OnboardingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Closed: Story = {
	args: {
		open: false,
	},
};
