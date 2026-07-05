export type MonthKey =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

export interface Month {
  key: MonthKey;
  short: string;
  label: string;
}

export interface WaterMonth {
  month: MonthKey;
  /** Long-term mean river flow at the Falls in cubic metres per second (illustrative). */
  flowCumecs: number;
  /** Fraction of the cliff face carrying water, 0-1 (Zambian / eastern cataract). */
  zambianSideCoverage: number;
  /** How much spray/mist obscures the view, 0-1. */
  sprayLevel: number;
  headline: string;
  detail: string;
  /** Whether Devil's Pool / Livingstone Island swims are typically open. */
  devilsPoolOpen: boolean;
  tips: string[];
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Lodge {
  id: string;
  name: string;
  park: string;
  region: string;
  blurb: string;
  /** 5 = full fibre wifi, 1 = total digital detox. */
  connectivity: Rating;
  /** 5 = fully fenced resort, 1 = unfenced, animals walk through. */
  fencing: Rating;
  /** 5 = fully tracked & managed game viewing, 1 = pure wild tracking. */
  tracking: Rating;
  pricePerNightUsd: number;
  bestMonths: MonthKey[];
  highlights: string[];
}

export interface ClimateRecord {
  parkId: string;
  parkName: string;
  region: string;
  month: MonthKey;
  minC: number;
  maxC: number;
  rainMm: number;
  humidity: "Low" | "Moderate" | "High";
  summary: string;
  /** Warning shown when the reality contradicts the "Africa = hot" assumption. */
  warning?: string;
}

export interface PackingItem {
  item: string;
  reason: string;
  category: "Clothing" | "Gear" | "Health" | "Documents" | "Comfort";
  essential: boolean;
}

export interface TransitRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  scheduledHours: number;
  realisticHours: number;
  model: "Fill-to-Capacity" | "Fixed Schedule" | "Shared Taxi";
  cultureNote: string;
  operators: string[];
  bufferAdvice: string;
  snacks: string[];
}

export interface Phrase {
  english: string;
  local: string;
  pronunciation: string;
}

export interface LanguageLesson {
  id: string;
  language: string;
  nativeName: string;
  speakers: string;
  regions: string[];
  greeting: string;
  about: string;
  phrases: Phrase[];
}

export type NewsCategory =
  | "Falls"
  | "Wildlife"
  | "Travel"
  | "Culture"
  | "Weather"
  | "Transport";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  source: string;
  url?: string;
  /** ISO date string. */
  publishedAt: string;
  /** Popularity/recency signal, 0-100. Higher trends first. */
  trendingScore: number;
  tags: string[];
}

export interface MapPoint {
  id: string;
  name: string;
  category: "Falls" | "Park" | "City" | "Lake" | "Cultural";
  /** Position as a percentage within the illustrative map frame. */
  x: number;
  y: number;
  region: string;
  description: string;
}
