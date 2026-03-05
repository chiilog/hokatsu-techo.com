"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
	reset: () => void;
}

export default function ErrorPage({ reset }: ErrorProps) {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
			<h1 className="mb-2 font-bold text-2xl">エラーが発生しました</h1>
			<p className="mb-6 text-muted-foreground">
				申し訳ありません。問題が発生しました。
			</p>
			<Button onClick={reset}>もう一度試す</Button>
		</main>
	);
}
