import { cn } from "@/lib/utils";

// 案B「あたたかい」のブランドロゴ。2色塗りのハート（塗り＝やわらかいピーチ、線＝主役ピーチ）。
// 色は globals.css の --logo-fill / --logo-stroke トークンで管理（ライト/ダークで自動切替）。
export function AppLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        "size-5 fill-(--logo-fill) stroke-(--logo-stroke)",
        className,
      )}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
