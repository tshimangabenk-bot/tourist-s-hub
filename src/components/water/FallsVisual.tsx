"use client";

interface FallsVisualProps {
  coverage: number; // 0-1 fraction of cliff carrying water
  spray: number; // 0-1 mist level
}

const COLUMNS = 16;

export function FallsVisual({ coverage, spray }: FallsVisualProps) {
  const wetColumns = Math.round(coverage * COLUMNS);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-sky-200 to-sky-100 dark:from-slate-800 dark:to-slate-900">
      {/* Cliff / basalt gorge */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-stone-600 to-stone-800" />
      <div className="absolute inset-x-0 top-[38%] h-[6%] bg-stone-500/70" />

      {/* Water columns falling over the edge */}
      <div className="absolute inset-x-0 top-[42%] bottom-0 flex gap-[2px] px-2">
        {Array.from({ length: COLUMNS }).map((_, i) => {
          const wet = i < wetColumns;
          return (
            <div key={i} className="relative flex-1 overflow-hidden">
              {wet ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-100 to-sky-300 opacity-90 dark:from-slate-100 dark:via-sky-200 dark:to-sky-400" />
                  <span
                    className="absolute left-1/2 top-0 h-6 w-[3px] -translate-x-1/2 rounded-full bg-white/90"
                    style={{
                      animation: `fall-drop ${1 + (i % 4) * 0.25}s linear infinite`,
                      animationDelay: `${(i % 6) * 0.18}s`,
                    }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-stone-500 to-stone-700" />
              )}
            </div>
          );
        })}
      </div>

      {/* Spray / mist rising from the gorge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white to-transparent"
        style={{ opacity: 0.15 + spray * 0.75 }}
      />

      <div className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
        Zambian side · {Math.round(coverage * 100)}% water
      </div>
    </div>
  );
}
