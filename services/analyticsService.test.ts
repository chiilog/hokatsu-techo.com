import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("analyticsService", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    document.head.innerHTML = "";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("CLARITY_PROJECT_IDが設定されている場合、スクリプトが挿入される", async () => {
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = "abc123";
    const { initClarity } = await import("./analyticsService");

    initClarity();

    const script = document.querySelector("script[data-clarity]");
    expect(script).not.toBeNull();
    expect(script?.textContent).toContain("abc123");
  });

  it("CLARITY_PROJECT_IDが空の場合、スクリプトが挿入されない", async () => {
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = "";
    const { initClarity } = await import("./analyticsService");

    initClarity();

    expect(document.querySelector("script[data-clarity]")).toBeNull();
  });

  it("CLARITY_PROJECT_IDに不正な文字が含まれる場合、スクリプトが挿入されない", async () => {
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = "<script>alert(1)</script>";
    const { initClarity } = await import("./analyticsService");

    initClarity();

    expect(document.querySelector("script[data-clarity]")).toBeNull();
  });

  it("重複してスクリプトが挿入されない", async () => {
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = "abc123";
    const { initClarity } = await import("./analyticsService");

    initClarity();
    initClarity();

    const scripts = document.querySelectorAll("script[data-clarity]");
    expect(scripts.length).toBe(1);
  });
});
