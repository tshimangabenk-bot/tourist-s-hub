export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Tourist&rsquo;s Hub · Zambia</p>
            <p className="mt-1 max-w-md text-sm text-muted">
              Aligning expectations before you travel — so a dry cliff, a cold
              game drive or a fill-to-capacity bus becomes an informed choice,
              not a bad review.
            </p>
          </div>
          <p className="text-xs text-muted">
            Datasets are illustrative and modelled on published seasonal
            patterns for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
