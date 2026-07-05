"use client";

import { useState } from "react";
import { ROUTES } from "@/lib/data/transit";

const MODEL_STYLES: Record<string, { badge: string; icon: string }> = {
  "Fill-to-Capacity": { badge: "bg-accent/15 text-accent", icon: "⏳" },
  "Fixed Schedule": { badge: "bg-primary/15 text-primary", icon: "🕒" },
  "Shared Taxi": { badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400", icon: "🚕" },
};

export default function TransitPage() {
  const [activeId, setActiveId] = useState(ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === activeId) ?? ROUTES[0];
  const buffer = Math.max(0, route.realisticHours - route.scheduledHours);
  const style = MODEL_STYLES[route.model];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Module 04</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Transit &amp; Bus-Culture Buffer
        </h1>
        <p className="mt-3 text-muted">
          Many inter-city buses leave when they&rsquo;re full, not when the clock
          says. That&rsquo;s not chaos — it&rsquo;s the local rhythm. Here&rsquo;s
          how to ride it like a regular and turn the wait into part of the trip.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Route list */}
        <aside className="h-fit space-y-2 lg:sticky lg:top-20">
          {ROUTES.map((r) => {
            const active = r.id === activeId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <p className="text-sm font-semibold">
                  {r.from} → {r.to}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {r.distanceKm} km · {r.model}
                </p>
              </button>
            );
          })}
        </aside>

        {/* Route detail */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">
              {route.from} → {route.to}
            </h2>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
              {style.icon} {route.model}
            </span>
          </div>

          {/* Timeline */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <TimeCard label="On the ticket" value={`${route.scheduledHours} h`} tone="muted" />
            <TimeCard label="Realistic door-to-door" value={`${route.realisticHours} h`} tone="primary" />
            <TimeCard
              label="Buffer to plan for"
              value={buffer > 0 ? `+${buffer} h` : "on time"}
              tone="accent"
            />
          </div>

          <div className="mt-6 rounded-xl border border-border bg-background/60 p-4">
            <p className="text-sm font-medium">🧭 What&rsquo;s really going on</p>
            <p className="mt-1 text-sm text-muted">{route.cultureNote}</p>
          </div>

          <div className="mt-4 flex gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-medium text-primary">Buffer advice</p>
              <p className="mt-1 text-sm">{route.bufferAdvice}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">🏷️ Common operators</p>
              <ul className="mt-2 space-y-1">
                {route.operators.map((op) => (
                  <li key={op} className="text-sm text-muted">
                    • {op}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium">🍌 Turn the wait into a treat</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {route.snacks.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        Tip: the &ldquo;fill-to-capacity&rdquo; model means the earlier and busier
        the terminal, the faster your bus fills and departs. Mornings move fastest.
      </p>
    </div>
  );
}

function TimeCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "muted" | "primary" | "accent";
}) {
  const color =
    tone === "primary"
      ? "text-primary"
      : tone === "accent"
        ? "text-accent"
        : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
