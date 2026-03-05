import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OnboardingDialog } from "./OnboardingDialog";

describe("OnboardingDialog", () => {
	afterEach(() => {
		cleanup();
	});

	it("open=trueのとき、ダイアログが表示される", () => {
		render(<OnboardingDialog open={true} onClose={vi.fn()} />);

		expect(screen.getByText("保活手帳へようこそ")).toBeInTheDocument();
		expect(screen.getByText(/見学記録をかんたんに管理/)).toBeInTheDocument();
	});

	it("できることリストが表示される", () => {
		render(<OnboardingDialog open={true} onClose={vi.fn()} />);

		expect(screen.getByText("見学候補の園をリストアップ")).toBeInTheDocument();
		expect(screen.getByText("見学日を記録")).toBeInTheDocument();
		expect(screen.getByText("見学で気づいたことをメモ")).toBeInTheDocument();
		expect(screen.getByText("あとから一覧で見返す")).toBeInTheDocument();
	});

	it("データ保存の説明が表示される", () => {
		render(<OnboardingDialog open={true} onClose={vi.fn()} />);

		expect(
			screen.getByText(/端末（ブラウザ）に保存されます/),
		).toBeInTheDocument();
		expect(
			screen.getByText(/サーバーへの送信は行いません/),
		).toBeInTheDocument();
	});

	it("「はじめる」ボタンをクリックするとonCloseが呼ばれる", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(<OnboardingDialog open={true} onClose={onClose} />);

		await user.click(screen.getByTestId("onboarding-start-button"));

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("open=falseのとき、ダイアログが表示されない", () => {
		render(<OnboardingDialog open={false} onClose={vi.fn()} />);

		expect(screen.queryByText("保活手帳へようこそ")).not.toBeInTheDocument();
	});
});
