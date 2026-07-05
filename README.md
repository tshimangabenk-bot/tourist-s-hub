# Tourist's Hub — Zambia 🇿🇲

An interactive, **data-driven travel guide for Zambia** that aligns tourist
expectations _before_ they travel — turning the friction that usually ends in a
bad review into informed, confident decisions.

Built as a modern web-app dashboard with **Next.js 16 (App Router)**,
**TypeScript**, and **Tailwind CSS v4**.

> All datasets are illustrative and modelled on published seasonal patterns for
> demonstration purposes. This is a portfolio-quality product concept, not a live
> booking service.

## Why it exists

Many negative reviews of Zambian tourism come from mismatched expectations:

- Arriving at Victoria Falls in November to a **dry cliff** and feeling scammed.
- Being **shocked by unfenced camps**, uncollared animals, or no Wi-Fi.
- Freezing on a **5 °C open-vehicle morning game drive** in June.
- Culture shock over inter-city buses that **leave only when full**.

Tourist's Hub reframes each of these as an _expected_, well-prepared part of the
adventure.

## The six modules

| # | Module | Friction it solves |
|---|--------|--------------------|
| 01 | **Victoria Falls Water-Level Predictor** (`/water`) | Seasonal ignorance — pick a month and see exactly how much water to expect, from a year-round Zambezi flow model. |
| 02 | **Wildness Index & Connectivity Matcher** (`/wildness`) | Comfort shock — filter lodges on the custom **Bush Reality Scale** (Connectivity 📡→🚫, Fencing 🧱→🐾, Tracking 🛰️→🗺️) instead of generic star ratings. |
| 03 | **Packing & Weather Smart Grid** (`/packing`) | Wrong clothes — a packing list generated from real Zambian micro-climates per park and month, with reality-check warnings. |
| 04 | **Transit & Bus-Culture Buffer** (`/transit`) | Culture shock — onboarding for the "fill-to-capacity" bus model with realistic time buffers and local snack tips. |
| 05 | **Learn Zambian Languages** (`/languages`) | Feeling like an outsider — practical phrases in Bemba, Nyanja, Tonga and Lozi, with browser text-to-speech. |
| 06 | **Local Orientation Map** (`/map`) | No sense of place — an interactive, filterable map of falls, parks, lakes, cities and cultural sites. |

## Architecture

```
src/
├── app/                  # App Router pages (one per module) + root layout
│   ├── water/            # Module 01
│   ├── wildness/         # Module 02
│   ├── packing/          # Module 03
│   ├── transit/          # Module 04
│   ├── languages/        # Module 05
│   └── map/              # Module 06
├── components/           # Header, footer, shared controls, feature widgets
│   └── ItineraryContext.tsx  # Context-API state (month / park / budget)
└── lib/
    ├── types.ts          # Shared domain types
    ├── scale.ts          # Bush Reality Scale definitions
    └── data/             # Local JSON-style datasets (water, lodges, climate, transit, languages, maps)
```

- **State management:** a lightweight **Context API** store (`ItineraryContext`)
  holds the traveller's **month, destination and budget** and persists them to
  `localStorage`, so selections carry across modules.
- **Data handling:** a clean, typed local dataset under `src/lib/data`
  simulating real-world climate, river-flow and lodge-infrastructure data. It
  could be swapped for a Supabase backend without touching the UI.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- Context API for client state
