import type { WaterMonth } from "@/lib/types";

/**
 * Illustrative long-term seasonal pattern for the Zambezi River at Victoria Falls,
 * modelled on published Zambezi River Authority flow behaviour. Values are
 * representative averages used for planning expectations, not live gauge readings.
 *
 * Peak flood arrives around April; the lowest flows are in October/November when
 * the Zambian (eastern) side can run to bare rock while the Zimbabwean side keeps
 * a thread of water.
 */
export const WATER_YEAR: WaterMonth[] = [
  {
    month: "jan",
    flowCumecs: 1100,
    zambianSideCoverage: 0.55,
    sprayLevel: 0.35,
    headline: "Rising & greening",
    detail:
      "Early rains push the river up. The gorge is turning green and the falls are steadily filling out after the dry season.",
    devilsPoolOpen: false,
    tips: [
      "Good balance of water and visibility.",
      "Expect afternoon thunderstorms — plan activities for the morning.",
    ],
  },
  {
    month: "feb",
    flowCumecs: 1650,
    zambianSideCoverage: 0.7,
    sprayLevel: 0.5,
    headline: "Filling fast",
    detail:
      "The curtain is broadening across the basalt. Photography is still workable before the heavy flood spray takes over.",
    devilsPoolOpen: false,
    tips: [
      "Lush green scenery all around.",
      "Book a helicopter 'Flight of Angels' for the best unobstructed view.",
    ],
  },
  {
    month: "mar",
    flowCumecs: 2900,
    zambianSideCoverage: 0.9,
    sprayLevel: 0.75,
    headline: "Approaching peak",
    detail:
      "Thundering water across almost the entire width. The spray is climbing hundreds of metres — bring a raincoat, not a camera bag.",
    devilsPoolOpen: false,
    tips: [
      "Wear waterproofs; you WILL get soaked on the footpaths.",
      "Lenses fog instantly — a phone in a dry-bag is more practical.",
    ],
  },
  {
    month: "apr",
    flowCumecs: 3400,
    zambianSideCoverage: 1,
    sprayLevel: 0.95,
    headline: "Peak flood — 'The Smoke That Thunders'",
    detail:
      "Maximum flow. The full 1.7 km curtain roars and spray can be seen 50 km away, but it also hides the falls themselves from close viewpoints.",
    devilsPoolOpen: false,
    tips: [
      "Raw power is unforgettable, but expect limited close-up visibility.",
      "Cross to the Zimbabwe side for a wider frontal panorama.",
    ],
  },
  {
    month: "may",
    flowCumecs: 2200,
    zambianSideCoverage: 0.95,
    sprayLevel: 0.8,
    headline: "High water, better views",
    detail:
      "Flow is easing off the flood peak. Still a huge volume of water but the spray starts to settle enough for photos on clear days.",
    devilsPoolOpen: false,
    tips: [
      "Great blend of volume and visibility.",
      "Cool, dry, comfortable weather begins.",
    ],
  },
  {
    month: "jun",
    flowCumecs: 1200,
    zambianSideCoverage: 0.85,
    sprayLevel: 0.55,
    headline: "Classic postcard season",
    detail:
      "Clear skies, strong-but-photogenic flow. This is the picture-perfect combination most brochures show.",
    devilsPoolOpen: false,
    tips: [
      "Peak tourist season — book activities in advance.",
      "Cold mornings; bring a fleece for sunrise activities.",
    ],
  },
  {
    month: "jul",
    flowCumecs: 800,
    zambianSideCoverage: 0.7,
    sprayLevel: 0.4,
    headline: "Clear & comfortable",
    detail:
      "Water is receding but still impressive. Rainbows are reliable and the footpaths stay mostly dry.",
    devilsPoolOpen: false,
    tips: [
      "Excellent all-round month for first-time visitors.",
      "Dry-season game viewing in nearby parks is ramping up.",
    ],
  },
  {
    month: "aug",
    flowCumecs: 560,
    zambianSideCoverage: 0.55,
    sprayLevel: 0.3,
    headline: "Low & clear",
    detail:
      "The Zambian side is thinning out. Fantastic visibility of the gorge geology, with defined channels rather than a solid curtain.",
    devilsPoolOpen: true,
    tips: [
      "Devil's Pool swims typically open — a bucket-list experience.",
      "Reduced water means better photos but less drama.",
    ],
  },
  {
    month: "sep",
    flowCumecs: 420,
    zambianSideCoverage: 0.35,
    sprayLevel: 0.2,
    headline: "Low water — geology on show",
    detail:
      "Much of the Zambian cliff face is exposed. Great for Livingstone Island tours and Devil's Pool, thinner as a 'waterfall' spectacle.",
    devilsPoolOpen: true,
    tips: [
      "Best time for Devil's Pool and Livingstone Island breakfasts.",
      "If you want a raging waterfall, adjust expectations or view from Zimbabwe.",
    ],
  },
  {
    month: "oct",
    flowCumecs: 360,
    zambianSideCoverage: 0.15,
    sprayLevel: 0.1,
    headline: "Lowest water — manage expectations",
    detail:
      "The Zambian side can be largely dry rock. This is when uninformed tourists feel 'scammed'. The Zimbabwe side still flows.",
    devilsPoolOpen: true,
    tips: [
      "Set expectations: much of the eastern cataract is bare basalt.",
      "Cross the border or take a helicopter to still see flowing sections.",
      "It is also the hottest month — 'Suicide Month' locally.",
    ],
  },
  {
    month: "nov",
    flowCumecs: 430,
    zambianSideCoverage: 0.2,
    sprayLevel: 0.12,
    headline: "Low, first rains approaching",
    detail:
      "Still low, but the first storms hint at the coming rise. The classic month for the 'dry cliff' disappointment if you arrive unprepared.",
    devilsPoolOpen: true,
    tips: [
      "Manage expectations — this is a low-water month.",
      "Dramatic skies make for great landscape photography.",
    ],
  },
  {
    month: "dec",
    flowCumecs: 650,
    zambianSideCoverage: 0.4,
    sprayLevel: 0.25,
    headline: "Recovering",
    detail:
      "Rains are refilling the catchment and the falls begin to recover. Green season scenery returns to the surrounding bush.",
    devilsPoolOpen: false,
    tips: [
      "Water is climbing back — a nice quieter shoulder period.",
      "Green season means fewer crowds and lower prices.",
    ],
  },
];

export const PEAK_FLOW = Math.max(...WATER_YEAR.map((w) => w.flowCumecs));

export function waterForMonth(month: WaterMonth["month"]): WaterMonth {
  return WATER_YEAR.find((w) => w.month === month) ?? WATER_YEAR[0];
}
