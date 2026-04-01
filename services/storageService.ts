import type { StateStorage } from "zustand/middleware";

const STORAGE_KEYS = {
  nursery: "hokatsu-techo",
  cookieConsent: "hokatsu-techo-cookie-consent",
} as const;

const CURRENT_SCHEMA_VERSION = 1;

/**
 * localStorageから読み込んだ永続化データの型。
 * JSON.parseした信頼できないデータを扱うため、各フィールドはunknown型としている。
 */
interface PersistedState {
  state: {
    nurseries: unknown[];
    hasSeenOnboarding: unknown;
    hasSeenVisitTips: unknown;
  };
  version?: number;
}

/**
 * 永続化データのスキーマバージョンが古い場合に最新バージョンへマイグレーションする。
 * 既存の値を引き継ぎつつ、存在しないフィールドにはデフォルト値を設定する。
 * バージョンが最新の場合はそのまま返す。
 * @param parsed - localStorageからパースした永続化データ
 * @returns マイグレーション済みの永続化データ
 */
function migrate(parsed: PersistedState): PersistedState {
  const version = parsed.version ?? 0;

  if (version < CURRENT_SCHEMA_VERSION) {
    const state = parsed.state ?? {};
    return {
      state: {
        nurseries: Array.isArray(state.nurseries) ? state.nurseries : [],
        hasSeenOnboarding: state.hasSeenOnboarding ?? false,
        hasSeenVisitTips: state.hasSeenVisitTips ?? false,
      },
      version: CURRENT_SCHEMA_VERSION,
    };
  }

  return parsed;
}

/**
 * Zustand persist ミドルウェア用のカスタムストレージ。
 * 読み込み時にスキーマのマイグレーションを実行し、
 * バージョンが古いデータを自動的に最新の形式へ変換する。
 */
export const customStorage: StateStorage = {
  /**
   * localStorageからデータを読み込み、必要に応じてマイグレーションを実行する。
   * マイグレーションが発生した場合はlocalStorageへ書き戻す。
   * SSR環境ではnullを返す。
   * @param name - ストレージキー
   * @returns JSON文字列またはnull
   */
  getItem(name: string): string | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(name);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as PersistedState;
      const migrated = migrate(parsed);
      if (migrated !== parsed) {
        const updated = JSON.stringify(migrated);
        localStorage.setItem(name, updated);
        return updated;
      }
      return raw;
    } catch {
      return null;
    }
  },
  setItem(name: string, value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  },
  removeItem(name: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

export { STORAGE_KEYS, CURRENT_SCHEMA_VERSION };
