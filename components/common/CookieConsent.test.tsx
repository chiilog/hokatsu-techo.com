import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEYS } from "@/services/storageService";
import { CookieConsent } from "./CookieConsent";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: () => null,
}));

vi.mock("@/services/analyticsService", () => ({
  initClarity: vi.fn(),
}));

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("同意未決定のときバナーが表示される", () => {
    render(<CookieConsent />);
    expect(
      screen.getByRole("dialog", { name: "Cookie使用の同意" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Cookieを使用しています/)).toBeInTheDocument();
  });

  it("同意するボタンをクリックするとバナーが消える", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByRole("button", { name: "同意する" }));
    expect(
      screen.queryByRole("dialog", { name: "Cookie使用の同意" }),
    ).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEYS.cookieConsent)).toBe("accepted");
  });

  it("同意しないボタンをクリックするとバナーが消える", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByRole("button", { name: "同意しない" }));
    expect(
      screen.queryByRole("dialog", { name: "Cookie使用の同意" }),
    ).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEYS.cookieConsent)).toBe("declined");
  });

  it("すでに同意済みの場合バナーは表示されない", () => {
    localStorage.setItem(STORAGE_KEYS.cookieConsent, "accepted");
    render(<CookieConsent />);
    expect(
      screen.queryByRole("dialog", { name: "Cookie使用の同意" }),
    ).not.toBeInTheDocument();
  });
});
