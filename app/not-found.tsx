import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
			<h1 className="mb-2 font-bold text-4xl">404</h1>
			<p className="mb-6 text-muted-foreground">ページが見つかりませんでした</p>
			<Link
				href="/"
				className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm hover:bg-primary/90"
			>
				ホームに戻る
			</Link>
		</main>
	);
}
