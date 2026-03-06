import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Nursery } from "@/types/nursery";
import { NurseryList } from "./NurseryList";

const mockNurseries: Nursery[] = [
  {
    id: "1",
    name: "さくら保育園",
    visitDate: "2026-04-15",
    memo: "",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "ひまわり保育園",
    visitDate: null,
    memo: "駅から近い",
    createdAt: "2026-03-02T00:00:00.000Z",
    updatedAt: "2026-03-02T00:00:00.000Z",
  },
];

describe("NurseryList", () => {
  it("園のリストが表示される", () => {
    render(<NurseryList nurseries={mockNurseries} />);
    expect(screen.getByText("さくら保育園")).toBeInTheDocument();
    expect(screen.getByText("ひまわり保育園")).toBeInTheDocument();
  });

  it("園が0件の場合、空状態メッセージが表示される", () => {
    render(<NurseryList nurseries={[]} />);
    expect(screen.getByText("まだ園が登録されていません")).toBeInTheDocument();
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
