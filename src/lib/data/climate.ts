import type { ClimateRecord, MonthKey, PackingItem } from "@/lib/types";
import { MONTHS } from "./months";

interface ParkProfile {
  parkId: string;
  parkName: string;
  region: string;
  /** 12 monthly min temps, Jan..Dec (°C). */
  min: number[];
  /** 12 monthly max temps, Jan..Dec (°C). */
  max: number[];
  /** 12 monthly rainfall totals, Jan..Dec (mm). */
  rain: number[];
}

/**
 * Illustrative Zambian micro-climates. Values reflect the well-documented pattern
 * of frigid open-vehicle mornings in the cool-dry season (Jun-Jul) and searing
 * heat before the rains (Oct), which routinely surprises first-time visitors.
 */
const PROFILES: ParkProfile[] = [
  {
    parkId: "kafue",
    parkName: "Kafue National Park",
    region: "North-Western",
    min: [19, 19, 18, 15, 10, 6, 5, 8, 13, 18, 19, 19],
    max: [29, 29, 30, 30, 29, 27, 27, 30, 34, 36, 33, 30],
    rain: [200, 175, 120, 30, 5, 0, 0, 0, 2, 25, 110, 195],
  },
  {
    parkId: "south-luangwa",
    parkName: "South Luangwa National Park",
    region: "Eastern",
    min: [21, 21, 20, 17, 12, 9, 8, 10, 15, 20, 22, 21],
    max: [32, 32, 33, 33, 31, 29, 29, 32, 37, 40, 37, 33],
    rain: [230, 205, 140, 35, 3, 0, 0, 0, 1, 20, 95, 210],
  },
  {
    parkId: "lower-zambezi",
    parkName: "Lower Zambezi National Park",
    region: "Lusaka",
    min: [22, 22, 21, 18, 13, 10, 9, 11, 16, 21, 23, 22],
    max: [33, 33, 34, 34, 32, 30, 30, 33, 38, 41, 38, 34],
    rain: [190, 165, 110, 25, 2, 0, 0, 0, 1, 15, 85, 175],
  },
  {
    parkId: "mosi-oa-tunya",
    parkName: "Mosi-oa-Tunya / Livingstone",
    region: "Southern",
    min: [18, 18, 17, 14, 10, 7, 6, 9, 14, 18, 18, 18],
    max: [30, 30, 31, 31, 29, 27, 27, 30, 35, 37, 34, 31],
    rain: [175, 150, 95, 25, 3, 0, 0, 0, 2, 25, 90, 170],
  },
  {
    parkId: "liuwa-plain",
    parkName: "Liuwa Plain National Park",
    region: "Western",
    min: [18, 18, 17, 14, 9, 6, 5, 7, 12, 17, 18, 18],
    max: [30, 30, 31, 31, 30, 28, 28, 31, 35, 37, 33, 30],
    rain: [210, 185, 130, 30, 4, 0, 0, 0, 2, 30, 130, 205],
  },
  {
    parkId: "lusaka",
    parkName: "Lusaka (Capital)",
    region: "Lusaka",
    min: [17, 17, 16, 14, 10, 8, 7, 10, 14, 17, 18, 17],
    max: [26, 26, 27, 27, 25, 23, 23, 26, 30, 31, 29, 27],
    rain: [230, 190, 90, 20, 3, 0, 0, 0, 1, 15, 90, 200],
  },
];

function humidityFor(rain: number): ClimateRecord["humidity"] {
  if (rain >= 120) return "High";
  if (rain >= 20) return "Moderate";
  return "Low";
}

function summaryFor(min: number, max: number, rain: number): string {
  const season =
    rain >= 100
      ? "warm & wet"
      : min <= 9
        ? "cold mornings, mild afternoons"
        : max >= 36
          ? "hot & dry"
          : "pleasant & dry";
  return `Expect ${season}: ${min}\u2013${max}°C with ~${rain} mm of rain.`;
}

function warningFor(min: number, max: number): string | undefined {
  if (min <= 8) {
    return `Morning game drives drop to ${min}°C (${Math.round(
      (min * 9) / 5 + 32,
    )}°F) in open-air vehicles. Heavy fleece, hat and gloves are essential — "African safari = shorts" is a myth here.`;
  }
  if (max >= 38) {
    return `Afternoons soar to ${max}°C (${Math.round(
      (max * 9) / 5 + 32,
    )}°F). Rest through midday, hydrate hard, and plan activities for dawn and dusk.`;
  }
  return undefined;
}

export const CLIMATE: ClimateRecord[] = PROFILES.flatMap((p) =>
  MONTHS.map((m, i): ClimateRecord => {
    const min = p.min[i];
    const max = p.max[i];
    const rain = p.rain[i];
    return {
      parkId: p.parkId,
      parkName: p.parkName,
      region: p.region,
      month: m.key,
      minC: min,
      maxC: max,
      rainMm: rain,
      humidity: humidityFor(rain),
      summary: summaryFor(min, max, rain),
      warning: warningFor(min, max),
    };
  }),
);

export const PACKING_PARKS = PROFILES.map((p) => ({
  id: p.parkId,
  name: p.parkName,
  region: p.region,
}));

export function climateFor(parkId: string, month: MonthKey): ClimateRecord | undefined {
  return CLIMATE.find((c) => c.parkId === parkId && c.month === month);
}

/** Generates a smart packing list driven by the actual micro-climate. */
export function packingListFor(record: ClimateRecord): PackingItem[] {
  const items: PackingItem[] = [
    { item: "Neutral-colour shirts (khaki, olive, beige)", reason: "Bright colours and blue/black attract insects and spook wildlife.", category: "Clothing", essential: true },
    { item: "Comfortable walking shoes", reason: "For game walks, uneven terrain and camp paths.", category: "Clothing", essential: true },
    { item: "Wide-brim hat & UV sunglasses", reason: "The high-altitude sun is intense year-round.", category: "Clothing", essential: true },
    { item: "SPF 30+ sunscreen & lip balm", reason: "Sunburn is common even on cool days.", category: "Health", essential: true },
    { item: "Refillable water bottle", reason: "Hydration is critical in the dry bush air.", category: "Comfort", essential: true },
    { item: "Passport, visa & yellow-fever record", reason: "Required for entry and park permits.", category: "Documents", essential: true },
    { item: "Binoculars & camera", reason: "Wildlife is often distant; a zoom lens pays off.", category: "Gear", essential: false },
  ];

  if (record.minC <= 12) {
    items.push(
      { item: "Heavy fleece or down jacket", reason: `Dawn drives fall to ${record.minC}°C in open vehicles.`, category: "Clothing", essential: true },
      { item: "Gloves, beanie & scarf", reason: "Wind-chill on moving safari vehicles is brutal at sunrise.", category: "Clothing", essential: record.minC <= 8 },
      { item: "Thermal base layer", reason: "Layering keeps you warm at dawn and cool by mid-morning.", category: "Clothing", essential: record.minC <= 8 },
    );
  }

  if (record.maxC >= 34) {
    items.push(
      { item: "Lightweight breathable long sleeves", reason: `Afternoons hit ${record.maxC}°C — cover up to avoid sunburn while staying cool.`, category: "Clothing", essential: true },
      { item: "Electrolyte / rehydration sachets", reason: "Heavy sweating in extreme heat depletes salts fast.", category: "Health", essential: true },
      { item: "Cooling buff or neck wrap", reason: "A wet neck wrap makes midday heat bearable.", category: "Comfort", essential: false },
    );
  }

  if (record.rainMm >= 60) {
    items.push(
      { item: "Packable rain jacket / poncho", reason: `~${record.rainMm} mm of rain expected — storms roll in fast.`, category: "Gear", essential: true },
      { item: "Dry-bag for electronics", reason: "Protect cameras and phones during downpours and boat trips.", category: "Gear", essential: true },
      { item: "Quick-dry trousers", reason: "Cotton stays wet for hours in the humid green season.", category: "Clothing", essential: false },
      { item: "Insect repellent (DEET) & antimalarials", reason: "Mosquito activity peaks in the wet season — malaria zone.", category: "Health", essential: true },
    );
  } else {
    items.push({ item: "Insect repellent & antimalarials", reason: "Zambia's parks are malaria areas year-round; consult your doctor.", category: "Health", essential: true });
  }

  if (record.humidity === "High") {
    items.push({ item: "Extra changes of light clothing", reason: "High humidity means clothes dry slowly.", category: "Clothing", essential: false });
  }

  return items;
}
