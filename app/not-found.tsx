import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 font-bold text-4xl">404</h1>
      <p className="mb-6 text-muted-foreground">ページが見つかりませんでした</p>
      <Button asChild size="sm">
        <Link href="/">ホームに戻る</Link>
      </Button>
    </main>
  );
}
