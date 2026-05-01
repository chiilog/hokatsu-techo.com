import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DiscardChangesDialog } from "./DiscardChangesDialog";

describe("DiscardChangesDialog", () => {
  afterEach(() => {
    cleanup();
  });

  it("ダイアログが表示される", () => {
    render(
      <DiscardChangesDialog
        open={true}
        onDiscard={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("変更を破棄しますか？")).toBeInTheDocument();
    expect(
      screen.getByText("編集中の内容は保存されません。"),
    ).toBeInTheDocument();
  });

  it("破棄ボタンをクリックするとonDiscardが呼ばれる", async () => {
    const user = userEvent.setup();
    const onDiscard = vi.fn();
    render(
      <DiscardChangesDialog
        open={true}
        onDiscard={onDiscard}
        onCancel={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("discard-confirm-button"));
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });

  it("編集を続けるボタンをクリックするとonCancelが呼ばれる", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <DiscardChangesDialog
        open={true}
        onDiscard={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByTestId("discard-cancel-button"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("open=falseのときダイアログが表示されない", () => {
    render(
      <DiscardChangesDialog
        open={false}
        onDiscard={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.queryByText("変更を破棄しますか？")).not.toBeInTheDocument();
  });
});
