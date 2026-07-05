import type { Rating } from "@/lib/types";
import type { ScaleAxis } from "@/lib/scale";

export function ScaleMeter({ axis, rating }: { axis: ScaleAxis; rating: Rating }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{axis.title}</span>
        <span aria-hidden className="tabular-nums">
          {rating}/5
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <span title={axis.low.label} aria-hidden>
          {axis.low.emoji}
        </span>
        <div className="flex flex-1 gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`h-1.5 flex-1 rounded-full ${
                n <= rating ? "bg-primary" : "bg-foreground/10"
              }`}
            />
          ))}
        </div>
        <span title={axis.high.label} aria-hidden>
          {axis.high.emoji}
        </span>
      </div>
    </div>
  );
}
