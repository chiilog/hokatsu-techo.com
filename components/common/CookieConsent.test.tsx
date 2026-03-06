import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
    expect(screen.getByTestId("cookie-consent-banner")).toBeInTheDocument();
    expect(screen.getByText(/Cookieを使用しています/)).toBeInTheDocument();
  });

  it("同意するボタンをクリックするとバナーが消える", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByTestId("cookie-accept-button"));
    expect(
      screen.queryByTestId("cookie-consent-banner"),
    ).not.toBeInTheDocument();
    expect(localStorage.getItem("hokatsu-techo-cookie-consent")).toBe(
      "accepted",
    );
  });

  it("同意しないボタンをクリックするとバナーが消える", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByTestId("cookie-decline-button"));
    expect(
      screen.queryByTestId("cookie-consent-banner"),
    ).not.toBeInTheDocument();
    expect(localStorage.getItem("hokatsu-techo-cookie-consent")).toBe(
      "declined",
    );
  });

  it("すでに同意済みの場合バナーは表示されない", () => {
    localStorage.setItem("hokatsu-techo-cookie-consent", "accepted");
    render(<CookieConsent />);
    expect(
      screen.queryByTestId("cookie-consent-banner"),
    ).not.toBeInTheDocument();
  });
});
