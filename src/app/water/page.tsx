"use client";

import { useItinerary } from "@/components/ItineraryContext";
import { MonthSelector, monthName } from "@/components/Controls";
import { FallsVisual } from "@/components/water/FallsVisual";
import { PEAK_FLOW, WATER_YEAR, waterForMonth } from "@/lib/data/water";
import { MONTHS } from "@/lib/data/months";

export default function WaterPage() {
  const { month, setMonth } = useItinerary();
  const data = waterForMonth(month);
  const relative = Math.round((data.flowCumecs / PEAK_FLOW) * 100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Module 01</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Victoria Falls Water-Level Predictor
        </h1>
        <p className="mt-3 text-muted">
          Choose your travel month to see how much of &ldquo;The Smoke That
          Thunders&rdquo; you can realistically expect. Flow figures model
          long-term Zambezi River Authority seasonal patterns — so nobody
          arrives to a dry cliff feeling short-changed.
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <MonthSelector />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FallsVisual coverage={data.zambianSideCoverage} spray={data.sprayLevel} />

        <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{monthName(month)}</h2>
            {data.devilsPoolOpen && (
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                🏊 Devil&rsquo;s Pool likely open
              </span>
            )}
          </div>
          <p className="mt-1 text-lg font-medium text-primary">{data.headline}</p>
          <p className="mt-3 text-sm text-muted">{data.detail}</p>

          <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Stat label="River flow" value={`${data.flowCumecs.toLocaleString()}`} unit="m³/s" />
            <Stat label="vs. peak" value={`${relative}`} unit="%" />
            <Stat label="Spray" value={`${Math.round(data.sprayLevel * 100)}`} unit="%" />
          </dl>

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium">Local tips</p>
            <ul className="space-y-2">
              {data.tips.map((tip) => (
                <li key={tip} className="flex gap-2 text-sm text-muted">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Year-round flow chart */}
      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Year-round flow at a glance</h2>
        <p className="mt-1 text-sm text-muted">
          Relative river flow by month. Tap a bar to jump to that month.
        </p>
        <div className="mt-6 flex items-end gap-1.5 sm:gap-2" style={{ height: 180 }}>
          {WATER_YEAR.map((w) => {
            const h = Math.max(6, (w.flowCumecs / PEAK_FLOW) * 100);
            const active = w.month === month;
            return (
              <button
                key={w.month}
                type="button"
                onClick={() => setMonth(w.month)}
                className="group flex flex-1 flex-col items-center justify-end gap-1"
                title={`${monthName(w.month)}: ${w.flowCumecs.toLocaleString()} m³/s`}
              >
                <span
                  className={`w-full rounded-t-md transition-colors ${
                    active
                      ? "bg-primary"
                      : "bg-sky-400/70 group-hover:bg-sky-500 dark:bg-sky-500/60"
                  }`}
                  style={{ height: `${h}%` }}
                />
                <span
                  className={`text-[10px] sm:text-xs ${
                    active ? "font-semibold text-primary" : "text-muted"
                  }`}
                >
                  {MONTHS.find((m) => m.key === w.month)?.short}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="mt-6 text-xs text-muted">
        Peak flood typically arrives in April; the lowest flows are in
        October–November, when the Zambian side can run to bare rock while the
        Zimbabwean side keeps a thread of water.
      </p>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[11px] text-muted">{unit}</p>
      <p className="mt-1 text-[11px] font-medium text-muted">{label}</p>
    </div>
  );
}
