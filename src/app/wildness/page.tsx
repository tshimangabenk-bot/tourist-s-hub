"use client";

import { useMemo, useState } from "react";
import { LODGES } from "@/lib/data/lodges";
import { SCALE_AXES } from "@/lib/scale";
import { ScaleMeter } from "@/components/wildness/ScaleMeter";
import { useItinerary } from "@/components/ItineraryContext";
import type { Rating } from "@/lib/types";

const AXIS_HINT: Record<string, string> = {
  connectivity: "1 = happy to go fully offline · 5 = must have reliable Wi-Fi",
  fencing: "1 = fine with animals in camp · 5 = must be fully fenced",
  tracking: "1 = want raw wild tracking · 5 = want managed, reliable sightings",
};

export default function WildnessPage() {
  const { budgetUsd, setBudgetUsd } = useItinerary();
  const [mins, setMins] = useState<Record<string, number>>({
    connectivity: 1,
    fencing: 1,
    tracking: 1,
  });

  const results = useMemo(() => {
    return LODGES.filter(
      (l) =>
        l.connectivity >= mins.connectivity &&
        l.fencing >= mins.fencing &&
        l.tracking >= mins.tracking &&
        l.pricePerNightUsd <= budgetUsd,
    ).sort((a, b) => a.pricePerNightUsd - b.pricePerNightUsd);
  }, [mins, budgetUsd]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Module 02</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Wildness Index & Connectivity Matcher
        </h1>
        <p className="mt-3 text-muted">
          Forget generic 5-star ratings. The <strong>Bush Reality Scale</strong>{" "}
          tells you the actual terrain reality — so you&rsquo;re never shocked by
          missing Wi-Fi, an unfenced camp, or a truly wild safari.
        </p>
      </header>

      {/* Legend */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {SCALE_AXES.map((axis) => (
          <div key={axis.key} className="rounded-xl border border-border bg-card p-4 text-sm">
            <p className="font-medium">{axis.title}</p>
            <p className="mt-2 flex items-center justify-between text-muted">
              <span>
                {axis.low.emoji} {axis.low.label}
              </span>
              <span className="text-muted">→</span>
              <span>
                {axis.high.emoji} {axis.high.label}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-20">
          <h2 className="font-semibold">Match my comfort</h2>
          <div className="mt-5 space-y-6">
            {SCALE_AXES.map((axis) => (
              <div key={axis.key}>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{axis.title}</span>
                  <span className="text-primary">min {mins[axis.key]}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={mins[axis.key]}
                  onChange={(e) =>
                    setMins((m) => ({ ...m, [axis.key]: Number(e.target.value) }))
                  }
                  className="mt-2 w-full accent-[var(--primary)]"
                />
                <p className="mt-1 text-xs text-muted">{AXIS_HINT[axis.key]}</p>
              </div>
            ))}

            <div>
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Max budget / night</span>
                <span className="text-primary">${budgetUsd}</span>
              </div>
              <input
                type="range"
                min={30}
                max={1200}
                step={10}
                value={budgetUsd}
                onChange={(e) => setBudgetUsd(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-4 text-sm text-muted">
            {results.length} stay{results.length === 1 ? "" : "s"} match your bush reality.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {results.map((l) => (
              <article
                key={l.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{l.name}</h3>
                    <p className="text-xs text-muted">
                      {l.park} · {l.region}
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    ${l.pricePerNightUsd}/nt
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{l.blurb}</p>

                <div className="mt-4 space-y-3">
                  {SCALE_AXES.map((axis) => (
                    <ScaleMeter
                      key={axis.key}
                      axis={axis}
                      rating={l[axis.key] as Rating}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {l.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-xs text-muted"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {results.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted">
              No stays match every filter. Try lowering a comfort minimum or
              raising your budget — the wildest experiences are often the least
              connected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
