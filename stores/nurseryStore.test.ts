import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useNurseryStore } from "@/stores/nurseryStore";

vi.mock("@/services/storageService", () => ({
  STORAGE_KEY: "hokatsu-techo-test",
  CURRENT_SCHEMA_VERSION: 1,
  customStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  },
}));

describe("nurseryStore", () => {
  beforeEach(() => {
    useNurseryStore.setState({
      nurseries: [],
      hasSeenOnboarding: false,
      hasSeenVisitTips: false,
    });
  });

  describe("addNursery", () => {
    it("園名・見学日・メモが正しく設定される", () => {
      useNurseryStore.getState().addNursery("テスト保育園", "2026-04-01");

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries).toHaveLength(1);
      expect(nurseries[0].name).toBe("テスト保育園");
      expect(nurseries[0].visitDate).toBe("2026-04-01");
      expect(nurseries[0].memo).toBe("");
    });

    it("id, createdAt, updatedAtが自動生成される", () => {
      useNurseryStore.getState().addNursery("テスト保育園", null);

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].id).toBeDefined();
      expect(nurseries[0].createdAt).toBeDefined();
      expect(nurseries[0].updatedAt).toBeDefined();
    });

    it("園名の前後の空白をトリムする", () => {
      useNurseryStore.getState().addNursery("  テスト保育園  ", null);

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].name).toBe("テスト保育園");
    });

    it("見学日をnullにできる（未定）", () => {
      useNurseryStore.getState().addNursery("テスト保育園", null);

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].visitDate).toBeNull();
    });

    it("新しい園がリストの先頭に追加される", () => {
      useNurseryStore.getState().addNursery("園A", null);
      useNurseryStore.getState().addNursery("園B", null);

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].name).toBe("園B");
      expect(nurseries[1].name).toBe("園A");
    });
  });

  describe("updateNursery", () => {
    let nurseryId: string;

    beforeEach(() => {
      useNurseryStore.getState().addNursery("テスト保育園", null);
      nurseryId = useNurseryStore.getState().nurseries[0].id;
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("園名を更新できる", () => {
      useNurseryStore
        .getState()
        .updateNursery(nurseryId, { name: "更新後の園名" });

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].name).toBe("更新後の園名");
    });

    it("メモを更新できる", () => {
      useNurseryStore
        .getState()
        .updateNursery(nurseryId, { memo: "先生が優しそうだった" });

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].memo).toBe("先生が優しそうだった");
    });

    it("更新時に園名の前後の空白をトリムする", () => {
      useNurseryStore
        .getState()
        .updateNursery(nurseryId, { name: "  更新後の園名  " });

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].name).toBe("更新後の園名");
    });

    it("見学日を更新できる", () => {
      useNurseryStore
        .getState()
        .updateNursery(nurseryId, { visitDate: "2026-05-15" });

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].visitDate).toBe("2026-05-15");
    });

    it("更新時にupdatedAtが更新される", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-03-05T10:00:00Z"));

      useNurseryStore.getState().addNursery("タイムスタンプ検証用", null);
      const targetId = useNurseryStore.getState().nurseries[0].id;
      const originalUpdatedAt =
        useNurseryStore.getState().nurseries[0].updatedAt;

      vi.setSystemTime(new Date("2026-03-05T10:01:00Z"));
      useNurseryStore.getState().updateNursery(targetId, { name: "更新後" });

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries[0].updatedAt).not.toBe(originalUpdatedAt);
    });
  });

  describe("deleteNursery", () => {
    it("園を削除できる", () => {
      useNurseryStore.getState().addNursery("テスト保育園", null);
      const id = useNurseryStore.getState().nurseries[0].id;

      useNurseryStore.getState().deleteNursery(id);

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries).toHaveLength(0);
    });

    it("存在しないIDの削除は何もしない", () => {
      useNurseryStore.getState().addNursery("テスト保育園", null);

      useNurseryStore.getState().deleteNursery("non-existent-id");

      const { nurseries } = useNurseryStore.getState();
      expect(nurseries).toHaveLength(1);
    });
  });

  describe("フラグ管理", () => {
    it("オンボーディング表示済みフラグを設定できる", () => {
      expect(useNurseryStore.getState().hasSeenOnboarding).toBe(false);

      useNurseryStore.getState().setOnboardingSeen();

      expect(useNurseryStore.getState().hasSeenOnboarding).toBe(true);
    });

    it("見学のコツ表示済みフラグを設定できる", () => {
      expect(useNurseryStore.getState().hasSeenVisitTips).toBe(false);

      useNurseryStore.getState().setVisitTipsSeen();

      expect(useNurseryStore.getState().hasSeenVisitTips).toBe(true);
    });
  });
});
