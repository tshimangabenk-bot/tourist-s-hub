import type { NewsItem } from "@/lib/types";

/**
 * Sample "trending" items used when Firebase isn't configured, and as the seed
 * payload for the Firestore `news` collection (see `scripts/seed-news.mjs`).
 * In production these documents would be written by an admin or by a scheduled
 * Cloud Function that pulls from an RSS feed / news API and scores them.
 */
export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: "falls-high-water-2026",
    title: "Victoria Falls hits peak flow early as strong rains fill the Zambezi",
    summary:
      "The Zambezi River Authority reports above-average flow heading into the flood season — expect thunderous water and heavy spray on the Zambian side.",
    category: "Falls",
    source: "Zambezi River Authority",
    publishedAt: "2026-03-28",
    trendingScore: 96,
    tags: ["victoria falls", "water level", "flood season"],
  },
  {
    id: "kafue-lions-busanga",
    title: "Busanga Plains lion prides thriving as dry season game viewing opens",
    summary:
      "Kafue's seasonal camps report excellent big-cat sightings on the drying Busanga floodplain — one of the best times for a fly-in safari.",
    category: "Wildlife",
    source: "Tourist's Hub Field Notes",
    publishedAt: "2026-06-15",
    trendingScore: 88,
    tags: ["kafue", "lions", "safari"],
  },
  {
    id: "kuomboka-2026",
    title: "Kuomboka ceremony date announced for the Barotse floodplain",
    summary:
      "The Lozi royal barge procession is one of Zambia's most spectacular cultural events. Travellers to the Western Province should book early.",
    category: "Culture",
    source: "Barotse Royal Establishment",
    publishedAt: "2026-04-02",
    trendingScore: 84,
    tags: ["kuomboka", "lozi", "western province"],
  },
  {
    id: "cold-snap-june",
    title: "Cold snap: game-drive mornings drop below 5°C across the Luangwa",
    summary:
      "A cool-dry air mass is pushing pre-dawn temperatures into single digits. Pack heavy fleece and gloves for open-vehicle drives.",
    category: "Weather",
    source: "Zambia Meteorological Department",
    publishedAt: "2026-06-20",
    trendingScore: 80,
    tags: ["weather", "south luangwa", "packing"],
  },
  {
    id: "bat-migration-kasanka",
    title: "Kasanka's 10-million fruit-bat migration begins its annual arrival",
    summary:
      "The world's largest mammal migration is under way. Sunset roost flights peak in November and December — book hides in advance.",
    category: "Wildlife",
    source: "Kasanka Trust",
    publishedAt: "2026-11-05",
    trendingScore: 78,
    tags: ["kasanka", "bats", "migration"],
  },
  {
    id: "livingstone-flights",
    title: "New direct flights boost access to Livingstone and Victoria Falls",
    summary:
      "Additional regional connections are cutting transfer times for travellers heading to the Falls. Compare bus vs. fly options for your route.",
    category: "Transport",
    source: "Tourist's Hub Travel Desk",
    publishedAt: "2026-05-10",
    trendingScore: 72,
    tags: ["livingstone", "flights", "transport"],
  },
  {
    id: "devils-pool-open",
    title: "Devil's Pool swims reopen as water levels recede",
    summary:
      "Livingstone Island tours and the famous Devil's Pool are back for the low-water season (roughly August–December). Not for the faint-hearted.",
    category: "Falls",
    source: "Livingstone Island Operators",
    publishedAt: "2026-08-12",
    trendingScore: 70,
    tags: ["devils pool", "victoria falls", "low water"],
  },
  {
    id: "lower-zambezi-canoe",
    title: "Lower Zambezi canoe safaris rated among Africa's best water adventures",
    summary:
      "Paddling past hippos and elephants along the Zambezi continues to draw rave reviews. Dry season (June–September) offers the calmest conditions.",
    category: "Travel",
    source: "Tourist's Hub Field Notes",
    publishedAt: "2026-07-01",
    trendingScore: 66,
    tags: ["lower zambezi", "canoe", "safari"],
  },
];
