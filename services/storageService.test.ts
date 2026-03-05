import { beforeEach, describe, expect, it } from "vitest";
import { customStorage } from "@/services/storageService";

describe("storageService", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe("getItem", () => {
		it("存在しないキーはnullを返す", () => {
			const result = customStorage.getItem("non-existent");
			expect(result).toBeNull();
		});

		it("正常なデータを取得できる", () => {
			const data = {
				state: {
					nurseries: [],
					hasSeenOnboarding: false,
					hasSeenVisitTips: false,
				},
				version: 1,
			};
			localStorage.setItem("test-key", JSON.stringify(data));

			const result = customStorage.getItem("test-key");
			expect(result).not.toBeNull();
			const parsed = JSON.parse(result as string);
			expect(parsed.state.nurseries).toEqual([]);
			expect(parsed.version).toBe(1);
		});

		it("不正なJSONはnullを返す", () => {
			localStorage.setItem("test-key", "invalid json");

			const result = customStorage.getItem("test-key");
			expect(result).toBeNull();
		});

		it("バージョン0のデータをマイグレーションする", () => {
			const oldData = {
				state: {
					nurseries: [{ id: "1", name: "テスト園" }],
				},
			};
			localStorage.setItem("test-key", JSON.stringify(oldData));

			const result = customStorage.getItem("test-key");
			expect(result).not.toBeNull();
			const parsed = JSON.parse(result as string);
			expect(parsed.version).toBe(1);
			expect(parsed.state.hasSeenOnboarding).toBe(false);
			expect(parsed.state.hasSeenVisitTips).toBe(false);
		});
	});

	describe("setItem", () => {
		it("データを保存できる", () => {
			customStorage.setItem("test-key", '{"state":{"nurseries":[]}}');

			const stored = localStorage.getItem("test-key");
			expect(stored).toBe('{"state":{"nurseries":[]}}');
		});
	});

	describe("removeItem", () => {
		it("データを削除できる", () => {
			localStorage.setItem("test-key", "data");

			customStorage.removeItem("test-key");

			expect(localStorage.getItem("test-key")).toBeNull();
		});
	});
});
