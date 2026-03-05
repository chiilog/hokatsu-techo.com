import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Nursery } from "@/types/nursery";
import { NurseryCard } from "./NurseryCard";

afterEach(() => {
	cleanup();
});

const mockNursery: Nursery = {
	id: "test-1",
	name: "さくら保育園",
	visitDate: "2026-04-15",
	memo: "",
	createdAt: "2026-03-01T00:00:00.000Z",
	updatedAt: "2026-03-01T00:00:00.000Z",
};

describe("NurseryCard", () => {
	it("園名が表示される", () => {
		render(<NurseryCard nursery={mockNursery} />);
		expect(screen.getByText("さくら保育園")).toBeInTheDocument();
	});

	it("見学日がフォーマットされて表示される", () => {
		render(<NurseryCard nursery={mockNursery} />);
		expect(screen.getByText("2026/4/15")).toBeInTheDocument();
	});

	it("見学日がnullの場合「未定」と表示される", () => {
		render(<NurseryCard nursery={{ ...mockNursery, visitDate: null }} />);
		expect(screen.getByText("未定")).toBeInTheDocument();
	});

	it("メモがある場合プレビューが表示される", () => {
		render(
			<NurseryCard
				nursery={{ ...mockNursery, memo: "園庭が広くて明るい雰囲気" }}
			/>,
		);
		expect(screen.getByText("園庭が広くて明るい雰囲気")).toBeInTheDocument();
	});

	it("メモが空の場合プレビューが表示されない", () => {
		render(<NurseryCard nursery={mockNursery} />);
		const card = screen.getByTestId("nursery-card-test-1");
		expect(card.querySelectorAll("p")).toHaveLength(0);
	});

	it("園詳細へのリンクが設定されている", () => {
		render(<NurseryCard nursery={mockNursery} />);
		const link = screen.getByTestId("nursery-card-test-1");
		expect(link).toHaveAttribute("href", "/nursery/test-1");
	});
});
