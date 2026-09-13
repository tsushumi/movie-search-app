export default function Pagination({ page, totalResults, onPageChange }) {
  const totalPages = Math.ceil(Number(totalResults) / 10);
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4 text-sm">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-sm border border-border-soft px-4 py-2 text-paper disabled:opacity-30 hover:border-marquee/60"
      >
        ← Previous
      </button>
      <span className="text-muted">
        Page {page} of {totalPages} · {totalResults} results
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-sm border border-border-soft px-4 py-2 text-paper disabled:opacity-30 hover:border-marquee/60"
      >
        Next →
      </button>
    </div>
  );
}
