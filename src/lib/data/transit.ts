import type { TransitRoute } from "@/lib/types";

/**
 * Inter-city routes with cultural onboarding notes. The goal is to reframe the
 * "fill-to-capacity" bus culture as an expected part of the experience rather
 * than a frustration that turns into an angry review.
 */
export const ROUTES: TransitRoute[] = [
  {
    id: "lusaka-livingstone",
    from: "Lusaka",
    to: "Livingstone",
    distanceKm: 480,
    scheduledHours: 6,
    realisticHours: 8,
    model: "Fill-to-Capacity",
    cultureNote:
      "Many buses on this route leave when full, not strictly on the clock. The 08:00 on your ticket is when boarding starts, not always when wheels roll.",
    operators: ["Shalom", "Power Tools", "Mazhandu Family Bus"],
    bufferAdvice:
      "Add a 2-hour buffer and never book a same-day connecting flight. Bring water, a charged phone and patience.",
    snacks: ["Roasted maize", "Fritters (vitumbuwa)", "Bananas", "Bottled water & maheu"],
  },
  {
    id: "lusaka-livingstone-premium",
    from: "Lusaka",
    to: "Livingstone",
    distanceKm: 480,
    scheduledHours: 6,
    realisticHours: 6.5,
    model: "Fixed Schedule",
    cultureNote:
      "Premium coaches (e.g. inter-city luxury lines) depart closer to schedule with reserved seats and air-con — a smoother option for the same corridor.",
    operators: ["Euro Africa (premium)", "Likili"],
    bufferAdvice:
      "Reserve online or a day ahead. Still allow 30–60 minutes of slack for police checkpoints along the T1.",
    snacks: ["Onboard snacks sold on some coaches", "Buy fruit at the terminal"],
  },
  {
    id: "lusaka-chipata",
    from: "Lusaka",
    to: "Chipata (for South Luangwa)",
    distanceKm: 570,
    scheduledHours: 8,
    realisticHours: 10,
    model: "Fill-to-Capacity",
    cultureNote:
      "The gateway to South Luangwa. Long haul east on the Great East Road; departures firm up once the bus is full.",
    operators: ["Johabie", "Zam-Malawi coaches"],
    bufferAdvice:
      "Travel by daylight, overnight in Chipata, then transfer to Mfuwe the next morning. Don't try it all in one day.",
    snacks: ["Samosas", "Boiled eggs", "Groundnuts", "Sugar cane"],
  },
  {
    id: "lusaka-kitwe",
    from: "Lusaka",
    to: "Kitwe (Copperbelt)",
    distanceKm: 360,
    scheduledHours: 5,
    realisticHours: 6,
    model: "Fixed Schedule",
    cultureNote:
      "A busy commercial corridor with frequent, fairly punctual departures throughout the day.",
    operators: ["Juldan Motors", "Power Tools"],
    bufferAdvice:
      "Departures are regular — you rarely wait long, but confirm the last bus if travelling in the afternoon.",
    snacks: ["Meat pies", "Cold drinks", "Roasted groundnuts"],
  },
  {
    id: "livingstone-sesheke",
    from: "Livingstone",
    to: "Sesheke / Katima border",
    distanceKm: 200,
    scheduledHours: 3,
    realisticHours: 4.5,
    model: "Shared Taxi",
    cultureNote:
      "Shared taxis and minibuses run when full. Pricing is negotiable; agree the fare before you get in.",
    operators: ["Local minibuses", "Shared taxis"],
    bufferAdvice:
      "Go early — vehicles fill fastest in the morning. Carry small kwacha notes for the fare and the border.",
    snacks: ["Fritters", "Fruit from roadside vendors", "Water"],
  },
  {
    id: "lusaka-mongu",
    from: "Lusaka",
    to: "Mongu (for Liuwa Plain)",
    distanceKm: 610,
    scheduledHours: 8,
    realisticHours: 9.5,
    model: "Fill-to-Capacity",
    cultureNote:
      "The long western run toward the Barotse floodplain. Expect a full bus and a leisurely pace across the Kafue flats.",
    operators: ["Shalom", "CR Holdings"],
    bufferAdvice:
      "From Mongu onward to Liuwa you'll need a 4x4 transfer — arrange it in advance, don't improvise.",
    snacks: ["Fresh fish near Mongu", "Cassava", "Bottled water"],
  },
];
