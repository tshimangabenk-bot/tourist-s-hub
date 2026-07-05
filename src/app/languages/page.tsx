"use client";

import { useState } from "react";
import { LANGUAGES } from "@/lib/data/languages";

export default function LanguagesPage() {
  const [activeId, setActiveId] = useState(LANGUAGES[0].id);
  const lang = LANGUAGES.find((l) => l.id === activeId) ?? LANGUAGES[0];

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Module 05</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Learn a little of the local language
        </h1>
        <p className="mt-3 text-muted">
          English is official, but a few words in the local language open doors,
          earn smiles and lower prices at the market. Zambia has 70+ languages —
          here are four of the most useful for travellers.
        </p>
      </header>

      {/* Language tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {LANGUAGES.map((l) => {
          const active = l.id === activeId;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setActiveId(l.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-fg"
                  : "border border-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {l.language}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Language info */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted">{lang.nativeName}</p>
          <h2 className="text-2xl font-bold">{lang.language}</h2>
          <button
            type="button"
            onClick={() => speak(lang.greeting)}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
          >
            🔊 {lang.greeting}
          </button>
          <p className="mt-4 text-sm text-muted">{lang.about}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="font-medium">Speakers</dt>
              <dd className="text-muted">{lang.speakers}</dd>
            </div>
            <div>
              <dt className="font-medium">Where it&rsquo;s spoken</dt>
              <dd className="text-muted">{lang.regions.join(", ")}</dd>
            </div>
          </dl>
        </aside>

        {/* Phrase cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {lang.phrases.map((p) => (
            <div
              key={p.english}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="text-xs text-muted">{p.english}</p>
                <p className="mt-0.5 text-lg font-semibold">{p.local}</p>
                <p className="mt-0.5 text-xs italic text-muted">{p.pronunciation}</p>
              </div>
              <button
                type="button"
                aria-label={`Hear ${p.local}`}
                onClick={() => speak(p.local)}
                className="rounded-lg border border-border p-2 text-lg hover:border-primary"
              >
                🔊
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        Audio uses your browser&rsquo;s built-in speech synthesis, so
        pronunciation is approximate — use the written phonetics as your guide.
      </p>
    </div>
  );
}
