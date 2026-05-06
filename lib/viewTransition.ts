export type Direction = "forward" | "back";

export function startSlideTransition(
  direction: Direction,
  update: () => void,
): void {
  if (typeof document === "undefined" || !("startViewTransition" in document)) {
    update();
    return;
  }
  const root = document.documentElement;
  root.dataset.vtDirection = direction;
  const transition = document.startViewTransition(update);
  transition.finished
    .catch(() => {})
    .finally(() => {
      // 後続クリックで上書きされた direction は触らない
      if (root.dataset.vtDirection === direction) {
        delete root.dataset.vtDirection;
      }
    });
}
