import type { Preview } from "@storybook/nextjs-vite";
import { createElement } from "react";
import { ThemeProvider } from "../components/common/ThemeProvider";
import "../app/globals.css";

const preview: Preview = {
  // 本番と同じく next-themes の ThemeProvider で包む。
  // これがないと ThemeToggle 等の useTheme() が provider 外になり無効化される。
  decorators: [
    (Story) =>
      createElement(
        ThemeProvider,
        { attribute: "class", defaultTheme: "light", enableSystem: true },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
