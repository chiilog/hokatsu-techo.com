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
    expect(
      screen.getByRole("button", { name: "追加する" }),
    ).toBeInTheDocument();
  });

  it("園名が空の場合、追加ボタンが非活性", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    expect(screen.getByRole("button", { name: "追加する" })).toBeDisabled();
  });

  it("「今日」と「あとで設定する」の選択肢がある", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    expect(screen.getByRole("button", { name: "今日" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "あとで設定する" }),
    ).toBeInTheDocument();
  });

  it("デフォルトは「あとで設定する」が選択されている", () => {
    render(<NurseryForm onAdd={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "あとで設定する" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "今日" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("園名のみで追加するとnullの見学日でonAddが呼ばれる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<NurseryForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("園名"), "さくら保育園");
    await user.click(screen.getByRole("button", { name: "追加する" }));

    expect(onAdd).toHaveBeenCalledWith("さくら保育園", null);
  });

  it("「今日」を選択して追加すると本日日付でonAddが呼ばれる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<NurseryForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("園名"), "ひまわり保育園");
    await user.click(screen.getByRole("button", { name: "今日" }));
    await user.click(screen.getByRole("button", { name: "追加する" }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    const [calledName, calledDate] = onAdd.mock.calls[0];
    expect(calledName).toBe("ひまわり保育園");
    expect(calledDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
