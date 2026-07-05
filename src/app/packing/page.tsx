"use client";

import { useMemo, useState } from "react";
import { MonthSelector, ParkSelector, monthName } from "@/components/Controls";
import { useItinerary } from "@/components/ItineraryContext";
import { PACKING_PARKS, climateFor, packingListFor } from "@/lib/data/climate";
import type { PackingItem } from "@/lib/types";

const CATEGORIES: PackingItem["category"][] = [
  "Clothing",
  "Gear",
  "Health",
  "Documents",
  "Comfort",
];

export default function PackingPage() {
  const { month, parkId } = useItinerary();
  const activeParkId = PACKING_PARKS.some((p) => p.id === parkId)
    ? parkId
    : PACKING_PARKS[0].id;

  const record = climateFor(activeParkId, month);
  const list = useMemo(() => (record ? packingListFor(record) : []), [record]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const packedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Module 03</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Packing &amp; Weather Smart Grid
        </h1>
        <p className="mt-3 text-muted">
          Zambia isn&rsquo;t one climate. Pick a park and month and we override
          the &ldquo;African safari = shorts and t-shirts&rdquo; assumption with
          a packing list mapped to that exact micro-climate.
        </p>
      </header>

      <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 md:grid-cols-2">
        <ParkSelector parks={PACKING_PARKS} label="Park / destination" />
        <MonthSelector />
      </div>

      {record && (
        <>
          {record.warning && (
            <div className="mt-6 flex gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-accent">Reality check</p>
                <p className="mt-1 text-sm">{record.warning}</p>
              </div>
            </div>
          )}

          <section className="mt-6 grid gap-4 sm:grid-cols-4">
            <WeatherStat label="Low" value={`${record.minC}°C`} sub={`${cToF(record.minC)}°F`} />
            <WeatherStat label="High" value={`${record.maxC}°C`} sub={`${cToF(record.maxC)}°F`} />
            <WeatherStat label="Rainfall" value={`${record.rainMm} mm`} sub={record.humidity + " humidity"} />
            <WeatherStat label="When" value={monthName(month)} sub={record.parkName} />
          </section>

          <p className="mt-4 text-sm text-muted">{record.summary}</p>

          {/* Packing grid */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Your smart packing list
              </h2>
              <span className="text-sm text-muted">
                {packedCount}/{list.length} packed
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const catItems = list.filter((i) => i.category === cat);
                if (catItems.length === 0) return null;
                return (
                  <div
                    key={cat}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                      {cat}
                    </h3>
                    <ul className="space-y-3">
                      {catItems.map((item) => {
                        const id = `${cat}-${item.item}`;
                        return (
                          <li key={id}>
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={!!checked[id]}
                                onChange={() =>
                                  setChecked((c) => ({ ...c, [id]: !c[id] }))
                                }
                                className="mt-1 h-4 w-4 accent-[var(--primary)]"
                              />
                              <span>
                                <span
                                  className={`text-sm font-medium ${
                                    checked[id] ? "text-muted line-through" : ""
                                  }`}
                                >
                                  {item.item}
                                  {item.essential && (
                                    <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                                      ESSENTIAL
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block text-xs text-muted">
                                  {item.reason}
                                </span>
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function WeatherStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}

function cToF(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}
