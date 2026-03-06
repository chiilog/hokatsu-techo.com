import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CURRENT_SCHEMA_VERSION,
  customStorage,
  STORAGE_KEY,
} from "@/services/storageService";
import type { Nursery } from "@/types/nursery";

interface NurseryStore {
  nurseries: Nursery[];
  hasSeenOnboarding: boolean;
  hasSeenVisitTips: boolean;

  addNursery: (name: string, visitDate: string | null) => void;
  updateNursery: (
    id: string,
    updates: Partial<Omit<Nursery, "id" | "createdAt">>,
  ) => void;
  deleteNursery: (id: string) => void;
  setOnboardingSeen: () => void;
  setVisitTipsSeen: () => void;
}

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
        set((state) => ({
          nurseries: state.nurseries.map((n) =>
            n.id === id
              ? { ...n, ...updates, updatedAt: new Date().toISOString() }
              : n,
          ),
        }));
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
      name: STORAGE_KEY,
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
