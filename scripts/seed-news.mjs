/**
 * Seeds the Firestore `news` collection with sample trending stories.
 *
 * Usage:
 *   1. Fill in .env.local (see .env.example).
 *   2. Temporarily allow writes to /news in firestore.rules (test mode), OR
 *      run this against the Firestore emulator.
 *   3. Run:  node --env-file=.env.local scripts/seed-news.mjs
 *
 * In production, prefer writing news from a scheduled Cloud Function using the
 * Firebase Admin SDK rather than the client SDK used here.
 */
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!config.apiKey || !config.projectId) {
  console.error(
    "Missing Firebase env vars. Copy .env.example to .env.local and fill it in,\n" +
      "then run:  node --env-file=.env.local scripts/seed-news.mjs",
  );
  process.exit(1);
}

const NEWS = [
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

const app = initializeApp(config);
const db = getFirestore(app);

let ok = 0;
for (const item of NEWS) {
  try {
    await setDoc(doc(db, "news", item.id), item);
    console.log("seeded:", item.id);
    ok += 1;
  } catch (err) {
    console.error("failed:", item.id, err?.message ?? err);
  }
}

console.log(`\nDone. ${ok}/${NEWS.length} documents written to the "news" collection.`);
process.exit(ok === NEWS.length ? 0 : 1);
