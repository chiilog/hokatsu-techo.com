import { flushSync } from "react-dom";

export type Direction = "forward" | "back";

const NAVIGATION_TIMEOUT_MS = 1000;

let pendingResolve: (() => void) | null = null;
let pendingTimeoutId: ReturnType<typeof setTimeout> | null = null;

export function resolvePendingTransition(): void {
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }
  if (pendingResolve) {
    const resolve = pendingResolve;
    pendingResolve = null;
    resolve();
  }
}

export function startSlideTransition(
  direction: Direction,
  update: () => void,
): void {
  if (typeof document === "undefined" || !("startViewTransition" in document)) {
    update();
    return;
  }
  // 連続クリックで前の transition が未完なら即解決して二重起動を回避
  resolvePendingTransition();

  const root = document.documentElement;
  root.dataset.vtDirection = direction;

  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        pendingResolve = resolve;
        // ナビゲーション完了通知が来なかった場合のフェイルセーフ
        pendingTimeoutId = setTimeout(
          resolvePendingTransition,
          NAVIGATION_TIMEOUT_MS,
        );
        flushSync(update);
      }),
  );

  transition.finished
    .catch(() => {})
    .finally(() => {
      // 後続クリックで上書きされた direction は触らない
      if (root.dataset.vtDirection === direction) {
        delete root.dataset.vtDirection;
      }
    });
}
