import type { MapPoint } from "@/lib/types";

/**
 * Illustrative positions on a stylised map of Zambia. x/y are percentages within
 * the SVG frame (0 = left/top, 100 = right/bottom) — good enough for an at-a-glance
 * orientation map, not survey-grade coordinates.
 */
export const MAP_POINTS: MapPoint[] = [
  { id: "victoria-falls", name: "Victoria Falls", category: "Falls", x: 33, y: 90, region: "Southern", description: "Mosi-oa-Tunya, 'The Smoke That Thunders'. Near Livingstone on the Zambezi." },
  { id: "livingstone", name: "Livingstone", category: "City", x: 30, y: 86, region: "Southern", description: "Tourism capital and gateway to the Falls." },
  { id: "lusaka", name: "Lusaka", category: "City", x: 55, y: 62, region: "Lusaka", description: "The capital city and main transport hub." },
  { id: "kafue", name: "Kafue National Park", category: "Park", x: 38, y: 55, region: "North-Western", description: "Zambia's largest park — Busanga Plains and big cats." },
  { id: "south-luangwa", name: "South Luangwa NP", category: "Park", x: 74, y: 42, region: "Eastern", description: "Home of the walking safari; superb leopard sightings." },
  { id: "lower-zambezi", name: "Lower Zambezi NP", category: "Park", x: 66, y: 70, region: "Lusaka", description: "Canoe safaris along the Zambezi River." },
  { id: "liuwa-plain", name: "Liuwa Plain NP", category: "Park", x: 14, y: 52, region: "Western", description: "Remote plains and the second-largest wildebeest migration." },
  { id: "kasanka", name: "Kasanka NP", category: "Park", x: 56, y: 42, region: "Central", description: "The world's largest fruit-bat migration each Nov–Dec." },
  { id: "nsumbu", name: "Nsumbu NP", category: "Park", x: 62, y: 12, region: "Northern", description: "On the shore of Lake Tanganyika — bush meets beach." },
  { id: "lake-tanganyika", name: "Lake Tanganyika", category: "Lake", x: 66, y: 8, region: "Northern", description: "World's longest freshwater lake; clear swimming and snorkelling." },
  { id: "lake-kariba", name: "Lake Kariba", category: "Lake", x: 55, y: 80, region: "Southern", description: "Vast reservoir on the Zambezi shared with Zimbabwe." },
  { id: "kuomboka", name: "Barotse Floodplain", category: "Cultural", x: 16, y: 58, region: "Western", description: "Site of the Kuomboka ceremony of the Lozi people." },
  { id: "chipata", name: "Chipata", category: "City", x: 82, y: 46, region: "Eastern", description: "Eastern hub and gateway town to South Luangwa." },
  { id: "kitwe", name: "Kitwe", category: "City", x: 47, y: 40, region: "Copperbelt", description: "Heart of the Copperbelt mining region." },
];

export const MAP_CATEGORIES = ["Falls", "Park", "City", "Lake", "Cultural"] as const;
