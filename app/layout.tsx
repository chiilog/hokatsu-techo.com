import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { CookieConsent } from "@/components/common/CookieConsent";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ViewTransitionResolver } from "@/components/common/ViewTransitionResolver";
import "./globals.css";

// 丸ゴシック。CSS 変数 --font-rounded として globals.css の --font-sans から参照される
const rounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "保活手帳",
  description: "保育園見学の記録を残すアプリ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={rounded.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ViewTransitionResolver />
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
