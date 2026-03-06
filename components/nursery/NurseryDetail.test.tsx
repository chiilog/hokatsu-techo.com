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
    render(
      <NurseryDetail
        nursery={mockNursery}
        onUpdate={vi.fn()}
        onVisitTipsClick={vi.fn()}
      />,
    );
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
        onUpdate={vi.fn()}
        onVisitTipsClick={vi.fn()}
      />,
    );
    expect(
      screen.getByText("気づいたことを自由に書けます"),
    ).toBeInTheDocument();
  });

  it("園名を編集できる", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(
      <NurseryDetail
        nursery={mockNursery}
        onUpdate={onUpdate}
        onVisitTipsClick={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("edit-name-button"));
    const input = screen.getByTestId("edit-name-input");
    await user.clear(input);
    await user.type(input, "ひまわり保育園");
    await user.click(screen.getByTestId("save-name-button"));

    expect(onUpdate).toHaveBeenCalledWith({ name: "ひまわり保育園" });
  });

  it("園名を空にするとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(
      <NurseryDetail
        nursery={mockNursery}
        onUpdate={vi.fn()}
        onVisitTipsClick={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("edit-name-button"));
    const input = screen.getByTestId("edit-name-input");
    await user.clear(input);
    await user.click(screen.getByTestId("save-name-button"));

    expect(screen.getByTestId("name-error")).toHaveTextContent(
      "園名を入力してください",
    );
  });

  it("見学日を編集できる", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(
      <NurseryDetail
        nursery={mockNursery}
        onUpdate={onUpdate}
        onVisitTipsClick={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("edit-date-button"));
    const input = screen.getByTestId("edit-date-input");
    await user.clear(input);
    await user.type(input, "2026-05-01");
    await user.click(screen.getByTestId("save-date-button"));

    expect(onUpdate).toHaveBeenCalledWith({ visitDate: "2026-05-01" });
  });

  it("メモを編集できる", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(
      <NurseryDetail
        nursery={mockNursery}
        onUpdate={onUpdate}
        onVisitTipsClick={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("edit-memo-button"));
    const textarea = screen.getByTestId("edit-memo-textarea");
    await user.clear(textarea);
    await user.type(textarea, "先生が優しい");
    await user.click(screen.getByTestId("save-memo-button"));

    expect(onUpdate).toHaveBeenCalledWith({ memo: "先生が優しい" });
  });

  it("見学のコツリンクをクリックするとonVisitTipsClickが呼ばれる", async () => {
    const user = userEvent.setup();
    const onVisitTipsClick = vi.fn();
    render(
      <NurseryDetail
        nursery={mockNursery}
        onUpdate={vi.fn()}
        onVisitTipsClick={onVisitTipsClick}
      />,
    );

    await user.click(screen.getByTestId("visit-tips-link"));
    expect(onVisitTipsClick).toHaveBeenCalledTimes(1);
  });
});
