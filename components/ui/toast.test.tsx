import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Toast } from "@/hooks/useToast";
import { ToastContainer } from "./toast";

describe("ToastContainer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("トーストが表示される", () => {
    const toasts: Toast[] = [
      { id: "1", message: "保存しました", type: "success" },
    ];
    render(<ToastContainer toasts={toasts} onRemove={vi.fn()} />);

    expect(screen.getByText("保存しました")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("エラートーストが表示される", () => {
    const toasts: Toast[] = [
      { id: "1", message: "保存できませんでした", type: "error" },
    ];
    render(<ToastContainer toasts={toasts} onRemove={vi.fn()} />);

    expect(screen.getByText("保存できませんでした")).toBeInTheDocument();
  });

  it("トーストが空の場合はコンテナは存在するがトーストは表示されない", () => {
    render(<ToastContainer toasts={[]} onRemove={vi.fn()} />);

    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("一定時間後にonRemoveが呼ばれる", () => {
    const onRemove = vi.fn();
    const toasts: Toast[] = [
      { id: "1", message: "保存しました", type: "success" },
    ];
    render(<ToastContainer toasts={toasts} onRemove={onRemove} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("複数のトーストを表示できる", () => {
    const toasts: Toast[] = [
      { id: "1", message: "保存しました", type: "success" },
      { id: "2", message: "もう一つ", type: "success" },
    ];
    render(<ToastContainer toasts={toasts} onRemove={vi.fn()} />);

    expect(screen.getByText("保存しました")).toBeInTheDocument();
    expect(screen.getByText("もう一つ")).toBeInTheDocument();
  });

  it("role=statusとaria-live=politeが常に設定されている", () => {
    render(<ToastContainer toasts={[]} onRemove={vi.fn()} />);

    const container = screen.getByRole("status");
    expect(container).toHaveAttribute("aria-live", "polite");
  });
});
