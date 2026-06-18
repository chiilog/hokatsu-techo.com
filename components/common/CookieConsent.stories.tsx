import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { STORAGE_KEYS } from "@/services/storageService";
import { CookieConsent } from "./CookieConsent";

const meta = {
  title: "Common/CookieConsent",
  component: CookieConsent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      localStorage.removeItem(STORAGE_KEYS.cookieConsent);
      return <Story />;
    },
  ],
} satisfies Meta<typeof CookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
