"use client";

import { useMemo, useState } from "react";
import { MAP_CATEGORIES, MAP_POINTS } from "@/lib/data/maps";
import type { MapPoint } from "@/lib/types";

const CATEGORY_COLOR: Record<string, string> = {
  Falls: "#2563eb",
  Park: "#1f7a4d",
  City: "#e08a1e",
  Lake: "#0891b2",
  Cultural: "#9333ea",
};

const CATEGORY_ICON: Record<string, string> = {
  Falls: "💦",
  Park: "🐾",
  City: "🏙️",
  Lake: "🌊",
  Cultural: "🎭",
};

// Illustrative, stylised outline of Zambia within a 100x100 frame.
const ZAMBIA_PATH =
  "M8,52 L14,44 L20,46 L24,40 L30,42 L34,36 L40,30 L46,22 L52,14 L58,8 L64,6 L70,10 L74,18 L72,26 L78,30 L86,28 L92,34 L90,42 L84,46 L86,54 L82,62 L86,70 L82,78 L74,80 L70,74 L64,78 L58,74 L52,80 L44,78 L40,84 L34,88 L28,84 L26,76 L20,72 L16,64 L10,60 Z";

export default function MapPage() {
  const [active, setActive] = useState<Set<string>>(new Set(MAP_CATEGORIES));
  const [selected, setSelected] = useState<MapPoint | null>(
    MAP_POINTS.find((p) => p.id === "victoria-falls") ?? null,
  );

  function toggle(cat: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const visible = useMemo(
    () => MAP_POINTS.filter((p) => active.has(p.category)),
    [active],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Module 06</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Local orientation map
        </h1>
        <p className="mt-3 text-muted">
          Get your bearings before you arrive. See where Zambia&rsquo;s falls,
          national parks, lakes, cities and cultural sites sit relative to each
          other. Tap a marker for details.
        </p>
      </header>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {MAP_CATEGORIES.map((cat) => {
          const on = active.has(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggle(cat)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                on
                  ? "border-transparent text-white"
                  : "border-border bg-card text-muted"
              }`}
              style={on ? { backgroundColor: CATEGORY_COLOR[cat] } : undefined}
            >
              <span>{CATEGORY_ICON[cat]}</span>
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Map */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-2">
          <svg viewBox="0 0 100 100" className="h-auto w-full" role="img" aria-label="Stylised map of Zambia">
            <path
              d={ZAMBIA_PATH}
              fill="var(--primary)"
              fillOpacity={0.12}
              stroke="var(--primary)"
              strokeOpacity={0.5}
              strokeWidth={0.6}
            />
            {visible.map((p) => {
              const isSel = selected?.id === p.id;
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x} ${p.y})`}
                  className="cursor-pointer"
                  onClick={() => setSelected(p)}
                >
                  <circle
                    r={isSel ? 2.8 : 1.9}
                    fill={CATEGORY_COLOR[p.category]}
                    stroke="#fff"
                    strokeWidth={0.5}
                  />
                  {isSel && (
                    <circle
                      r={4.4}
                      fill="none"
                      stroke={CATEGORY_COLOR[p.category]}
                      strokeWidth={0.6}
                      opacity={0.6}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail + list */}
        <div className="space-y-4">
          {selected && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{CATEGORY_ICON[selected.category]}</span>
                <div>
                  <h2 className="font-semibold">{selected.name}</h2>
                  <p className="text-xs text-muted">
                    {selected.category} · {selected.region} Province
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{selected.description}</p>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-2">
            <ul className="max-h-80 space-y-1 overflow-y-auto">
              {visible.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selected?.id === p.id
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted hover:bg-foreground/5"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLOR[p.category] }}
                    />
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        This is a stylised orientation map for planning at a glance — not to
        geographic scale. Always use a GPS map for navigation.
      </p>
    </div>
  );
}
