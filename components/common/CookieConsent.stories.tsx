import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CookieConsent } from "./CookieConsent";

const meta = {
  title: "Common/CookieConsent",
  component: CookieConsent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      localStorage.removeItem("hokatsu-techo-cookie-consent");
      return <Story />;
    },
  ],
} satisfies Meta<typeof CookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
