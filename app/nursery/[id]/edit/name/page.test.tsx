import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useNurseryStore } from "@/stores/nurseryStore";
import EditNamePage from "./page";

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useParams: () => ({ id: "test-1" }),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

describe("EditNamePage", () => {
  beforeEach(() => {
    useNurseryStore.setState({
      nurseries: [
        {
          id: "test-1",
          name: "さくら保育園",
          visitDate: null,
          memo: "",
          createdAt: "2026-03-01T00:00:00.000Z",
          updatedAt: "2026-03-01T00:00:00.000Z",
        },
      ],
      hasSeenOnboarding: true,
      hasSeenVisitTips: true,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("園名ラベルで入力欄を取得できる", async () => {
    render(<EditNamePage />);
    expect(await screen.findByLabelText("園名")).toBeInTheDocument();
  });

  it("既存の園名が初期値として表示される", async () => {
    render(<EditNamePage />);
    expect(await screen.findByLabelText("園名")).toHaveValue("さくら保育園");
  });
});
