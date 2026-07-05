import type { Rating } from "@/lib/types";

export interface ScaleAxis {
  key: "connectivity" | "fencing" | "tracking";
  title: string;
  /** Emoji + short label for a HIGH score (rating 5). */
  high: { emoji: string; label: string };
  /** Emoji + short label for a LOW score (rating 1). */
  low: { emoji: string; label: string };
}

export const SCALE_AXES: ScaleAxis[] = [
  {
    key: "connectivity",
    title: "Connectivity",
    high: { emoji: "📡", label: "Full Wi-Fi" },
    low: { emoji: "🚫", label: "Digital detox" },
  },
  {
    key: "fencing",
    title: "Fencing",
    high: { emoji: "🧱", label: "Fenced / resort" },
    low: { emoji: "🐾", label: "Animals walk through" },
  },
  {
    key: "tracking",
    title: "Tracking style",
    high: { emoji: "🛰️", label: "Tracked / managed" },
    low: { emoji: "🗺️", label: "Pure wild tracking" },
  },
];

export function ratingLabel(axis: ScaleAxis, rating: Rating): string {
  const labels: Record<number, string> = {
    5: axis.high.label,
    1: axis.low.label,
  };
  return labels[rating] ?? "Mixed";
}
