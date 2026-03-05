import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NurseryForm } from "./NurseryForm";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: mockPush }),
}));

const mockAddNursery = vi.fn();
vi.mock("@/stores/nurseryStore", () => ({
	useNurseryStore: (
		selector: (s: { addNursery: typeof mockAddNursery }) => unknown,
	) => selector({ addNursery: mockAddNursery }),
}));

describe("NurseryForm", () => {
	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it("フォームが表示される", () => {
		render(<NurseryForm />);
		expect(screen.getByLabelText("園名")).toBeInTheDocument();
		expect(screen.getByLabelText("見学日（任意）")).toBeInTheDocument();
		expect(screen.getByTestId("add-nursery-button")).toBeInTheDocument();
	});

	it("園名が空の場合、追加ボタンが非活性", () => {
		render(<NurseryForm />);
		expect(screen.getByTestId("add-nursery-button")).toBeDisabled();
	});

	it("園名を入力すると追加ボタンが活性化される", async () => {
		const user = userEvent.setup();
		render(<NurseryForm />);

		await user.type(screen.getByTestId("nursery-name-input"), "さくら保育園");
		expect(screen.getByTestId("add-nursery-button")).toBeEnabled();
	});

	it("園名のみで追加するとnullの見学日で園が追加される", async () => {
		const user = userEvent.setup();
		render(<NurseryForm />);

		await user.type(screen.getByTestId("nursery-name-input"), "さくら保育園");
		await user.click(screen.getByTestId("add-nursery-button"));

		expect(mockAddNursery).toHaveBeenCalledWith("さくら保育園", null);
		expect(mockPush).toHaveBeenCalledWith("/");
	});

	it("園名と見学日を入力して追加できる", async () => {
		const user = userEvent.setup();
		render(<NurseryForm />);

		await user.type(screen.getByTestId("nursery-name-input"), "ひまわり保育園");
		await user.type(screen.getByTestId("visit-date-input"), "2026-04-15");
		await user.click(screen.getByTestId("add-nursery-button"));

		expect(mockAddNursery).toHaveBeenCalledWith("ひまわり保育園", "2026-04-15");
		expect(mockPush).toHaveBeenCalledWith("/");
	});
});
