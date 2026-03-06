import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DeleteNurseryDialog } from "./DeleteNurseryDialog";

describe("DeleteNurseryDialog", () => {
  afterEach(() => {
    cleanup();
  });

  it("ダイアログが表示される", () => {
    render(
      <DeleteNurseryDialog
        open={true}
        nurseryName="さくら保育園"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("この園を削除しますか？")).toBeInTheDocument();
    expect(screen.getByText(/さくら保育園/)).toBeInTheDocument();
  });

  it("削除ボタンをクリックするとonConfirmが呼ばれる", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <DeleteNurseryDialog
        open={true}
        nurseryName="さくら保育園"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("delete-confirm-button"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("キャンセルボタンをクリックするとonCancelが呼ばれる", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <DeleteNurseryDialog
        open={true}
        nurseryName="さくら保育園"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByTestId("delete-cancel-button"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("open=falseのときダイアログが表示されない", () => {
    render(
      <DeleteNurseryDialog
        open={false}
        nurseryName="さくら保育園"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(
      screen.queryByText("この園を削除しますか？"),
    ).not.toBeInTheDocument();
  });
});
