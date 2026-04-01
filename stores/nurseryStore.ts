import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CURRENT_SCHEMA_VERSION,
  customStorage,
  STORAGE_KEYS,
} from "@/services/storageService";
import type { Nursery } from "@/types/nursery";

/** 園情報ストアの状態とアクションの型定義 */
interface NurseryStore {
  /** 登録済みの園一覧 */
  nurseries: Nursery[];
  /** オンボーディングを表示済みかどうか */
  hasSeenOnboarding: boolean;
  /** 見学のTipsを表示済みかどうか */
  hasSeenVisitTips: boolean;

  /**
   * 新しい園を追加する。リストの先頭に挿入される。
   * @param name - 園の名前（前後の空白は自動トリム）
   * @param visitDate - 見学日（ISO 8601形式の文字列またはnull）
   */
  addNursery: (name: string, visitDate: string | null) => void;
  /**
   * 既存の園情報を更新する。
   * @param id - 更新対象の園ID
   * @param updates - 更新するフィールド（id, createdAtは更新不可）
   */
  updateNursery: (
    id: string,
    updates: Partial<Omit<Nursery, "id" | "createdAt">>,
  ) => void;
  /**
   * 園を削除する。
   * @param id - 削除対象の園ID
   */
  deleteNursery: (id: string) => void;
  /** オンボーディングを表示済みとしてマークする */
  setOnboardingSeen: () => void;
  /** 見学のTipsを表示済みとしてマークする */
  setVisitTipsSeen: () => void;
}

/**
 * 園情報を管理するZustandストア。
 * localStorageに永続化され、スキーマのマイグレーションはcustomStorageが担当する。
 */
export const useNurseryStore = create<NurseryStore>()(
  persist(
    (set) => ({
      nurseries: [],
      hasSeenOnboarding: false,
      hasSeenVisitTips: false,

      addNursery: (name, visitDate) => {
        const now = new Date().toISOString();
        const newNursery: Nursery = {
          id: crypto.randomUUID(),
          name: name.trim(),
          visitDate,
          memo: "",
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          nurseries: [newNursery, ...state.nurseries],
        }));
      },

      updateNursery: (id, updates) => {
        const sanitized =
          updates.name !== undefined
            ? { ...updates, name: updates.name.trim() }
            : updates;
        set((state) => {
          if (!state.nurseries.some((n) => n.id === id)) return state;
          return {
            nurseries: state.nurseries.map((n) =>
              n.id === id
                ? { ...n, ...sanitized, updatedAt: new Date().toISOString() }
                : n,
            ),
          };
        });
      },

      deleteNursery: (id) => {
        set((state) => ({
          nurseries: state.nurseries.filter((n) => n.id !== id),
        }));
      },

      setOnboardingSeen: () => {
        set({ hasSeenOnboarding: true });
      },

      setVisitTipsSeen: () => {
        set({ hasSeenVisitTips: true });
      },
    }),
    {
      name: STORAGE_KEYS.nursery,
      version: CURRENT_SCHEMA_VERSION,
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        nurseries: state.nurseries,
        hasSeenOnboarding: state.hasSeenOnboarding,
        hasSeenVisitTips: state.hasSeenVisitTips,
      }),
    },
  ),
);
