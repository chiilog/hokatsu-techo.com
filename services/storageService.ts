import type { StateStorage } from "zustand/middleware";

const STORAGE_KEY = "hokatsu-techo";
const CURRENT_SCHEMA_VERSION = 1;

interface PersistedState {
  state: {
    nurseries: unknown[];
    hasSeenOnboarding: unknown;
    hasSeenVisitTips: unknown;
  };
  version?: number;
}

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

export const customStorage: StateStorage = {
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

export { STORAGE_KEY, CURRENT_SCHEMA_VERSION };
