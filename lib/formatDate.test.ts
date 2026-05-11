// @vitest-environment node
import { describe, expect, it } from "vitest";
import { formatVisitDate } from "@/lib/formatDate";

describe("formatVisitDate", () => {
  it("正常な日付文字列はja-JPロケールで整形した文字列を返す", () => {
    expect(formatVisitDate("2026-03-15")).toBe("2026/3/15");
  });

  it("nullは未定を返す", () => {
    expect(formatVisitDate(null)).toBe("未定");
  });

  it("空文字列は未定を返す", () => {
    expect(formatVisitDate("")).toBe("未定");
  });

  it("不正な日付文字列は未定を返す", () => {
    expect(formatVisitDate("invalid-date")).toBe("未定");
  });

  it("数値化できないトークンを含む文字列は未定を返す", () => {
    expect(formatVisitDate("2026-03-XX")).toBe("未定");
  });
});
