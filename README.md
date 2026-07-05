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
| 07 | **Trending Now** (`/news`) | Stale expectations — a live, ranked news feed powered by **Firebase Firestore** covering Falls levels, wildlife, weather, culture and transport. |

## Architecture

```
src/
├── app/                  # App Router pages (one per module) + root layout
│   ├── water/            # Module 01
│   ├── wildness/         # Module 02
│   ├── packing/          # Module 03
│   ├── transit/          # Module 04
│   ├── languages/        # Module 05
│   ├── map/              # Module 06
│   └── news/             # Module 07 — Firebase-backed trending feed
├── components/           # Header, footer, shared controls, feature widgets
│   └── ItineraryContext.tsx  # Context-API state (month / park / budget)
└── lib/
    ├── types.ts          # Shared domain types
    ├── scale.ts          # Bush Reality Scale definitions
    ├── firebase.ts       # Firebase init (env-driven, graceful fallback)
    ├── news.ts           # getTrendingNews(): Firestore with local fallback
    └── data/             # Local datasets (water, lodges, climate, transit, languages, maps, news)
```

- **State management:** a lightweight **Context API** store (`ItineraryContext`)
  holds the traveller's **month, destination and budget** and persists them to
  `localStorage`, so selections carry across modules.
- **Data handling:** a clean, typed local dataset under `src/lib/data`
  simulating real-world climate, river-flow and lodge-infrastructure data. The
  **Trending Now** module reads live from **Firebase Firestore**, and every
  other reference dataset could be migrated to Firestore the same way without
  touching the UI.

## Firebase & trending news

The `/news` module is backed by **Firebase Firestore**. It works in two modes:

- **Demo mode (no config):** shows the bundled sample stories from
  `src/lib/data/news.ts`. Nothing to set up.
- **Live mode:** reads the Firestore `news` collection, ordered by
  `trendingScore`.

### Go live in 3 steps

1. **Create a Firebase project** at <https://console.firebase.google.com>, add a
   Web app, and enable **Firestore Database**.
2. **Add config:** copy `.env.example` → `.env.local` and paste your Web app
   config values (`NEXT_PUBLIC_FIREBASE_*`). Deploy the rules in
   `firestore.rules` (public read, no public write).
3. **Add stories.** A `news` document looks like:

   ```jsonc
   {
     "title": "Victoria Falls hits peak flow early",
     "summary": "Above-average Zambezi flow heading into flood season…",
     "category": "Falls",            // Falls | Wildlife | Travel | Culture | Weather | Transport
     "source": "Zambezi River Authority",
     "url": "https://…",             // optional
     "publishedAt": "2026-03-28",     // ISO date
     "trendingScore": 96,             // 0-100, higher trends first
     "tags": ["victoria falls", "water level"]
   }
   ```

   Seed the sample set quickly (temporarily allow writes in test mode first):

   ```bash
   npm run seed:news        # uses .env.local via node --env-file
   ```

### How to keep news genuinely "trending"

Pick whichever fits your needs — the UI doesn't change:

1. **Admin-curated:** add/update `news` docs from the Firebase console or a small
   admin screen. Simple and free.
2. **Automated (recommended for real trends):** a **Firebase Cloud Function** on
   a schedule (Cloud Scheduler / `pubsub.schedule`) that pulls from an RSS feed
   or a news API (e.g. a Zambia tourism feed, GDELT, or NewsAPI), computes a
   `trendingScore` from recency + engagement, and writes the results to the
   `news` collection with the Admin SDK. The website then always shows the
   latest ranked items.
3. **Hybrid:** automated ingestion plus manual pinning/curation of featured
   stories.

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

## Deploy on Render

This repo ships a [`render.yaml`](./render.yaml) Blueprint, so Render can
provision the service automatically.

### Option A — Blueprint (recommended)

1. Push this repo to GitHub (already done).
2. In the [Render dashboard](https://dashboard.render.com), click
   **New +** → **Blueprint**, and select this repository.
3. Render reads `render.yaml` and creates a **Node web service** with:
   - Build command: `npm ci && npm run build`
   - Start command: `npm run start` (Next.js binds to Render's `$PORT`)
   - Health check: `/`
4. (Optional) Under the service's **Environment** tab, add your
   `NEXT_PUBLIC_FIREBASE_*` values to enable the live news feed. They must be
   set before the build runs; trigger a redeploy after adding them. Without
   them the app still works using the bundled sample data.
5. Click **Apply** — Render builds and deploys, then gives you a public
   `https://<name>.onrender.com` URL. `autoDeploy` redeploys on every push to
   `main`.

### Option B — Manual web service

If you prefer not to use the Blueprint, create **New + → Web Service**, connect
the repo, and set:

| Setting | Value |
|---------|-------|
| Runtime | Node |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Environment | `NODE_VERSION=22.14.0` (+ optional `NEXT_PUBLIC_FIREBASE_*`) |

> Note: the free Render plan spins the service down after inactivity, so the
> first request after idle can take a few seconds to cold-start.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- Context API for client state
- Firebase / Firestore for the live trending-news feed
