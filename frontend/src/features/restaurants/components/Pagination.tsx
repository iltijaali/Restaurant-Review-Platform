interface PaginationProps {
  page: number;
  totalPages: number;

  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-lg border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-70"
      >
        Previous
      </button>

      <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-70"
      >
        Next
      </button>
    </div>
  );
}
