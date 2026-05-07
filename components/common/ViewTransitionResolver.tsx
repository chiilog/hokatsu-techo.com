"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { resolvePendingTransition } from "@/lib/viewTransition";

/**
 * pathname の変化を監視し、待機中の startSlideTransition を解決する。
 * App Router の dynamic route で router.push 後の RSC fetch 完了を待ってから
 * View Transitions API のスナップショットを採取するために必要。
 */
export function ViewTransitionResolver() {
  const pathname = usePathname();
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname を変化検知のトリガーとしてのみ利用し、値は参照しない
  useEffect(() => {
    resolvePendingTransition();
  }, [pathname]);
  return null;
}
