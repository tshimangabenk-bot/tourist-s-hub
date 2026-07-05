"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MonthKey } from "@/lib/types";

export interface ItineraryState {
  month: MonthKey;
  parkId: string;
  budgetUsd: number;
}

interface ItineraryContextValue extends ItineraryState {
  setMonth: (month: MonthKey) => void;
  setParkId: (parkId: string) => void;
  setBudgetUsd: (budget: number) => void;
}

const DEFAULT_STATE: ItineraryState = {
  month: "jul",
  parkId: "south-luangwa",
  budgetUsd: 600,
};

const STORAGE_KEY = "tourists-hub-itinerary";

const ItineraryContext = createContext<ItineraryContextValue | null>(null);

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ItineraryState>(DEFAULT_STATE);

  useEffect(() => {
    // One-time rehydration from storage after mount. We deliberately start from
    // deterministic defaults on the server to avoid hydration mismatches, then
    // sync any saved itinerary in on the client.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state]);

  const value = useMemo<ItineraryContextValue>(
    () => ({
      ...state,
      setMonth: (month) => setState((s) => ({ ...s, month })),
      setParkId: (parkId) => setState((s) => ({ ...s, parkId })),
      setBudgetUsd: (budgetUsd) => setState((s) => ({ ...s, budgetUsd })),
    }),
    [state],
  );

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary(): ItineraryContextValue {
  const ctx = useContext(ItineraryContext);
  if (!ctx) {
    throw new Error("useItinerary must be used within an ItineraryProvider");
  }
  return ctx;
}
