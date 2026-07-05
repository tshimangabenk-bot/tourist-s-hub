"use client";

import { MONTHS } from "@/lib/data/months";
import { useItinerary } from "./ItineraryContext";
import type { MonthKey } from "@/lib/types";

export function MonthSelector({ label = "Travel month" }: { label?: string }) {
  const { month, setMonth } = useItinerary();
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {MONTHS.map((m) => {
          const active = m.key === month;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMonth(m.key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-fg"
                  : "border border-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
              aria-pressed={active}
            >
              {m.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ParkSelector({
  parks,
  label = "Destination",
}: {
  parks: { id: string; name: string }[];
  label?: string;
}) {
  const { parkId, setParkId } = useItinerary();
  const known = parks.some((p) => p.id === parkId);
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-muted" htmlFor="park-select">
        {label}
      </label>
      <select
        id="park-select"
        value={known ? parkId : parks[0]?.id}
        onChange={(e) => setParkId(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {parks.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function monthName(key: MonthKey): string {
  return MONTHS.find((m) => m.key === key)?.label ?? key;
}
