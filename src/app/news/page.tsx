"use client";

import { useEffect, useMemo, useState } from "react";
import { getTrendingNews } from "@/lib/news";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { NewsCategory, NewsItem } from "@/lib/types";

const CATEGORY_STYLE: Record<NewsCategory, string> = {
  Falls: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  Wildlife: "bg-primary/15 text-primary",
  Travel: "bg-accent/15 text-accent",
  Culture: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  Weather: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Transport: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
};

const CATEGORIES: NewsCategory[] = [
  "Falls",
  "Wildlife",
  "Travel",
  "Culture",
  "Weather",
  "Transport",
];

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [origin, setOrigin] = useState<"firestore" | "local">("local");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<NewsCategory | "All">("All");

  async function load() {
    setLoading(true);
    const res = await getTrendingNews();
    setItems(res.items);
    setOrigin(res.origin);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    getTrendingNews().then((res) => {
      if (!active) return;
      setItems(res.items);
      setOrigin(res.origin);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Live feed</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Trending now in Zambia</h1>
        <p className="mt-3 text-muted">
          Fresh, ranked updates on the Falls, wildlife, weather, culture and
          transport — so your expectations stay current right up to departure.
        </p>
      </header>

      {/* Data source banner */}
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm">
        <span
          className={`inline-flex h-2.5 w-2.5 rounded-full ${
            origin === "firestore" ? "bg-primary" : "bg-accent"
          }`}
        />
        {origin === "firestore" ? (
          <span>
            Live from <strong>Firebase Firestore</strong> (`news` collection).
          </span>
        ) : (
          <span>
            Showing bundled sample data.{" "}
            {isFirebaseConfigured
              ? "The Firestore `news` collection is empty — run the seed script."
              : "Add Firebase env vars to go live (see README)."}
          </span>
        )}
        <button
          type="button"
          onClick={() => void load()}
          className="ml-auto rounded-lg border border-border px-3 py-1.5 font-medium hover:border-primary"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-fg"
                  : "border border-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {visible.map((item, idx) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLE[item.category]}`}
                >
                  {item.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                  🔥 {item.trendingScore}
                  {filter === "All" && idx < 3 && (
                    <span className="ml-1 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                      #{idx + 1} TRENDING
                    </span>
                  )}
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold leading-snug">{item.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{item.summary}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{item.source}</span>
                <time dateTime={item.publishedAt}>
                  {new Date(item.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-sm font-medium text-primary hover:underline"
                >
                  Read more →
                </a>
              )}
            </article>
          ))}

          {visible.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted">
              No trending stories in this category right now.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
