import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "保活手帳",
	description: "保育園見学の記録を残すアプリ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
