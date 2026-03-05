import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VisitTipsDialog } from "./VisitTipsDialog";

describe("VisitTipsDialog", () => {
	afterEach(() => {
		cleanup();
	});

	it("ダイアログに3つのコツが表示される", () => {
		render(<VisitTipsDialog open={true} onClose={vi.fn()} />);
		expect(screen.getByText("見学のコツ")).toBeInTheDocument();
		expect(screen.getByText(/園の雰囲気を感じる/)).toBeInTheDocument();
		expect(screen.getByText(/設備・安全面をチェック/)).toBeInTheDocument();
		expect(screen.getByText(/生活リズムを確認/)).toBeInTheDocument();
	});

	it("閉じるボタンをクリックするとonCloseが呼ばれる", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(<VisitTipsDialog open={true} onClose={onClose} />);

		await user.click(screen.getByTestId("visit-tips-close-button"));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("open=falseのときダイアログが表示されない", () => {
		render(<VisitTipsDialog open={false} onClose={vi.fn()} />);
		expect(screen.queryByText("見学のコツ")).not.toBeInTheDocument();
	});
});
