import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// アイコンや短いラベルを丸い面に収める共通バッジ。
// 既定はピーチ面（bg-accent）。size/bg/文字色は className で上書きする。
// オンボーディングのチェック、見学のコツの番号、空状態のハート等で再利用する。
export function IconCircle({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-accent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
