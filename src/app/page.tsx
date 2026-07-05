import Link from "next/link";

const FEATURES = [
  {
    href: "/water",
    emoji: "💦",
    title: "Victoria Falls Water-Level Predictor",
    problem: "Arriving to a dry cliff in November and feeling scammed.",
    solution:
      "Pick your travel month and see exactly how much water to expect, using historical Zambezi flow patterns.",
  },
  {
    href: "/wildness",
    emoji: "🐾",
    title: "Wildness Index & Connectivity Matcher",
    problem: "Shocked by no Wi-Fi, unfenced camps or uncollared animals.",
    solution:
      "Filter lodges on the Bush Reality Scale: connectivity, fencing and tracking style — not generic star ratings.",
  },
  {
    href: "/packing",
    emoji: "🎒",
    title: "Packing & Weather Smart Grid",
    problem: "Freezing 5°C morning game drives in June; extreme heat in October.",
    solution:
      "A packing list generated from real Zambian micro-climates for your park and month.",
  },
  {
    href: "/transit",
    emoji: "🚌",
    title: "Transit & Bus-Culture Buffer",
    problem: "Culture shock over buses that leave only when full.",
    solution:
      "Onboarding for the 'fill-to-capacity' model so waiting becomes an expected, even enjoyable, experience.",
  },
  {
    href: "/languages",
    emoji: "🗣️",
    title: "Learn Zambian Languages",
    problem: "Feeling like an outsider with zero local words.",
    solution:
      "Practical phrases in Bemba, Nyanja, Tonga and Lozi to connect with people wherever you go.",
  },
  {
    href: "/map",
    emoji: "🗺️",
    title: "Local Orientation Map",
    problem: "No sense of where the parks, falls and cities actually are.",
    solution:
      "An interactive map of Zambia's falls, parks, lakes, cities and cultural sites.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
            📊 Data-driven expectations · 🇿🇲 Zambia
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Know before you go. Zambia, without the bad-review surprises.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Tourist&rsquo;s Hub aligns your expectations <em>before</em> you
            travel. Turn seasonal ignorance, wilderness shock and bus-culture
            frustration into an informed, well-packed, well-planned adventure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/water"
              className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-fg transition-transform hover:scale-[1.02]"
            >
              Try the Falls Predictor
            </Link>
            <Link
              href="/wildness"
              className="rounded-lg border border-border bg-card px-5 py-3 font-medium transition-colors hover:border-primary"
            >
              Explore the Bush Reality Scale
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Built around the friction real tourists complain about
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Each module targets a specific dataset challenge — reframing a
          potential complaint into practical, expectation-setting guidance.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="text-3xl">{f.emoji}</span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm text-muted">
                <span className="font-medium text-foreground">Friction: </span>
                {f.problem}
              </p>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-primary">Solution: </span>
                {f.solution}
              </p>
              <span className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open module →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
