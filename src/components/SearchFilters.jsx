const TYPES = [
  { value: "", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
  { value: "game", label: "Games" },
];

export default function SearchFilters({ type, year, onTypeChange, onYearChange }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
      <div className="flex gap-1.5">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onTypeChange(t.value)}
            className={`rounded-full border px-3 py-1 transition-colors ${
              type === t.value
                ? "border-marquee bg-marquee text-ink"
                : "border-border-soft text-muted hover:border-marquee/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-muted">
        Year
        <input
          type="number"
          inputMode="numeric"
          placeholder="e.g. 1999"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="w-24 rounded-sm border border-border-soft bg-surface px-2 py-1 text-paper placeholder:text-muted/70 focus:border-marquee focus:outline-none"
        />
      </label>
    </div>
  );
}
