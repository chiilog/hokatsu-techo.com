import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Nursery } from "@/types/nursery";
import { NurseryDetail } from "./NurseryDetail";

const mockNursery: Nursery = {
  id: "test-1",
  name: "さくら保育園",
  visitDate: "2026-04-15",
  memo: "園庭が広い",
  createdAt: "2026-03-01T00:00:00.000Z",
  updatedAt: "2026-03-01T00:00:00.000Z",
};

describe("NurseryDetail", () => {
  afterEach(() => {
    cleanup();
  });

  it("園名・見学日・メモが表示される", () => {
    render(<NurseryDetail nursery={mockNursery} onVisitTipsClick={vi.fn()} />);
    expect(screen.getByTestId("nursery-name")).toHaveTextContent(
      "さくら保育園",
    );
    expect(screen.getByTestId("visit-date")).toHaveTextContent("2026/4/15");
    expect(screen.getByText("園庭が広い")).toBeInTheDocument();
  });

  it("メモが空の場合プレースホルダーが表示される", () => {
    render(
      <NurseryDetail
        nursery={{ ...mockNursery, memo: "" }}
        onVisitTipsClick={vi.fn()}
      />,
    );
    expect(
      screen.getByText("気づいたことを自由に書けます"),
    ).toBeInTheDocument();
  });

  it("園名行にchevronとリンクが表示される", () => {
    render(<NurseryDetail nursery={mockNursery} onVisitTipsClick={vi.fn()} />);
    const nameLink = screen.getByTestId("edit-name-link");
    expect(nameLink).toHaveAttribute("href", "/nursery/test-1/edit/name");
  });

  it("見学日行にchevronとリンクが表示される", () => {
    render(<NurseryDetail nursery={mockNursery} onVisitTipsClick={vi.fn()} />);
    const dateLink = screen.getByTestId("edit-date-link");
    expect(dateLink).toHaveAttribute("href", "/nursery/test-1/edit/visit-date");
  });

  it("メモ行にchevronとリンクが表示される", () => {
    render(<NurseryDetail nursery={mockNursery} onVisitTipsClick={vi.fn()} />);
    const memoLink = screen.getByTestId("edit-memo-link");
    expect(memoLink).toHaveAttribute("href", "/nursery/test-1/edit/memo");
  });

  it("見学のコツリンクをクリックするとonVisitTipsClickが呼ばれる", async () => {
    const user = userEvent.setup();
    const onVisitTipsClick = vi.fn();
    render(
      <NurseryDetail
        nursery={mockNursery}
        onVisitTipsClick={onVisitTipsClick}
      />,
    );

    await user.click(screen.getByTestId("visit-tips-link"));
    expect(onVisitTipsClick).toHaveBeenCalledTimes(1);
  });

  it("見学日がnullの場合「未定」が表示される", () => {
    render(
      <NurseryDetail
        nursery={{ ...mockNursery, visitDate: null }}
        onVisitTipsClick={vi.fn()}
      />,
    );
    expect(screen.getByTestId("visit-date")).toHaveTextContent("未定");
  });
});
