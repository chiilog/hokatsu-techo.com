import type { Metadata, Viewport } from "next";
import { CookieConsent } from "@/components/common/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: "保活手帳",
  description: "保育園見学の記録を残すアプリ",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
