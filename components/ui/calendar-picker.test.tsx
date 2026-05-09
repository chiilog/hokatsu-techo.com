import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CalendarPicker } from "./calendar-picker";

describe("CalendarPicker", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("カレンダーが表示される", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-02"));
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={vi.fn()} />);
    expect(screen.getByTestId("calendar-picker")).toBeInTheDocument();
    expect(screen.getByTestId("month-label")).toHaveTextContent("2026年4月");
  });

  it("選択中の日付が日本語形式で表示される", () => {
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={vi.fn()} />);
    expect(screen.getByTestId("selected-date-display")).toHaveTextContent(
      "2026年4月15日（水）",
    );
  });

  it("未定の場合「未定」と表示される", () => {
    render(<CalendarPicker selectedDate={null} onSelect={vi.fn()} />);
    expect(screen.getByTestId("selected-date-display")).toHaveTextContent(
      "未定",
    );
  });

  it("日付をクリックするとonSelectが呼ばれる", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={onSelect} />);

    await user.click(screen.getByTestId("day-10"));
    expect(onSelect).toHaveBeenCalledWith("2026-04-10");
  });

  it("前月ボタンで月が切り替わる", async () => {
    const user = userEvent.setup();
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={vi.fn()} />);

    await user.click(screen.getByTestId("prev-month-button"));
    expect(screen.getByTestId("month-label")).toHaveTextContent("2026年3月");
  });

  it("次月ボタンで月が切り替わる", async () => {
    const user = userEvent.setup();
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={vi.fn()} />);

    await user.click(screen.getByTestId("next-month-button"));
    expect(screen.getByTestId("month-label")).toHaveTextContent("2026年5月");
  });

  it("未定にするボタンでnullが返される", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={onSelect} />);

    await user.click(screen.getByTestId("set-undecided-button"));
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it("selectedDateがnullの場合、今月が表示される", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-02"));
    render(<CalendarPicker selectedDate={null} onSelect={vi.fn()} />);
    expect(screen.getByTestId("month-label")).toHaveTextContent("2026年4月");
  });

  it("選択中の日付がハイライトされる", () => {
    render(<CalendarPicker selectedDate="2026-04-15" onSelect={vi.fn()} />);
    const day15 = screen.getByTestId("day-15");
    expect(day15).toHaveAttribute("aria-pressed", "true");
  });
});
