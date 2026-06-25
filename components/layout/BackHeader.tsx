import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { SlideLink } from "@/components/common/SlideLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 戻る操作は backHref か onBack のどちらか一方を必須とする（両方／どちらも無し、を型で禁止） */
type BackNavigation =
  | { backHref: string; onBack?: never }
  | { onBack: () => void; backHref?: never };

type BackHeaderProps = BackNavigation & {
  /** 見出し（省略可） */
  title?: string;
  /** 戻るボタンのアクセシブル名（既定: "戻る"） */
  backAriaLabel?: string;
  /** 「戻る」テキストを表示するか（false でアイコンのみ／既定: true） */
  showBackText?: boolean;
  /** 右側のアクション（完了ボタン等） */
  actions?: ReactNode;
};

/**
 * 各ページ共通の戻るヘッダー。ピーチ面（secondary）背景に統一する。
 * 戻る操作は backHref（SlideLink で戻る遷移）か onBack（コールバック）のどちらかで指定する。
 */
export function BackHeader({
  title,
  backHref,
  onBack,
  backAriaLabel = "戻る",
  showBackText = true,
  actions,
}: BackHeaderProps) {
  const backInner = (
    <>
      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      {showBackText && backAriaLabel}
    </>
  );

  // 戻るボタンの共通 props。テキストを出すときは可視ラベルがアクセシブル名になるため
  // aria-label は不要、アイコンのみのときだけ付与する。
  const backButtonProps = {
    variant: "ghost",
    size: "sm",
    className: "gap-1 px-2",
    "aria-label": showBackText ? undefined : backAriaLabel,
  } as const;

  return (
    <header className="sticky top-0 z-10 border-b bg-secondary">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3",
          actions && "justify-between",
        )}
      >
        <div className="flex items-center gap-2">
          {backHref ? (
            <Button {...backButtonProps} asChild>
              <SlideLink href={backHref} direction="back">
                {backInner}
              </SlideLink>
            </Button>
          ) : (
            <Button {...backButtonProps} onClick={onBack}>
              {backInner}
            </Button>
          )}
          {title && (
            <h1 className="font-bold text-lg text-secondary-foreground">
              {title}
            </h1>
          )}
        </div>
        {actions}
      </div>
    </header>
  );
}
