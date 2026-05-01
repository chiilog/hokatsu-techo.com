import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NurseryForm } from "./NurseryForm";

describe("NurseryForm", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("フォームが表示される", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    expect(screen.getByLabelText("園名")).toBeInTheDocument();
    expect(screen.getByText("見学日")).toBeInTheDocument();
    expect(screen.getByTestId("add-nursery-button")).toBeInTheDocument();
  });

  it("園名が空の場合、追加ボタンが非活性", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    expect(screen.getByTestId("add-nursery-button")).toBeDisabled();
  });

  it("「今日」と「あとで設定する」の選択肢がある", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    expect(screen.getByTestId("visit-date-today")).toBeInTheDocument();
    expect(screen.getByTestId("visit-date-later")).toBeInTheDocument();
  });

  it("デフォルトは「あとで設定する」が選択されている", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    const laterButton = screen.getByTestId("visit-date-later");
    expect(laterButton.className).toContain("border-primary");
  });

  it("園名のみで追加するとnullの見学日でonAddが呼ばれる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<NurseryForm onAdd={onAdd} />);

    await user.type(screen.getByTestId("nursery-name-input"), "さくら保育園");
    await user.click(screen.getByTestId("add-nursery-button"));

    expect(onAdd).toHaveBeenCalledWith("さくら保育園", null);
  });

  it("「今日」を選択して追加すると本日日付でonAddが呼ばれる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<NurseryForm onAdd={onAdd} />);

    await user.type(screen.getByTestId("nursery-name-input"), "ひまわり保育園");
    await user.click(screen.getByTestId("visit-date-today"));
    await user.click(screen.getByTestId("add-nursery-button"));

    expect(onAdd).toHaveBeenCalledTimes(1);
    const [calledName, calledDate] = onAdd.mock.calls[0];
    expect(calledName).toBe("ひまわり保育園");
    // ISO date format check (YYYY-MM-DD)
    expect(calledDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
