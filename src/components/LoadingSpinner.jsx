export default function LoadingSpinner({ label = "Loading movies…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted">
      <div
        className="h-10 w-10 rounded-full border-2 border-border-soft border-t-marquee animate-spin"
        role="status"
        aria-label={label}
      />
      <p className="font-display text-sm tracking-wide">{label}</p>
    </div>
  );
}
