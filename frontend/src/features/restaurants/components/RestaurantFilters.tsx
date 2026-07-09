interface RestaurantFiltersProps {
  cuisine: string;
  minRating: number;
  order: "ASC" | "DESC";
  sortBy: string;

  onCuisineChange: (value: string) => void;
  onRatingChange: (value: number) => void;
  onOrderChange: (value: "ASC" | "DESC") => void;
  onSortByChange: (value: string) => void;
  onReset: () => void;
}

export default function RestaurantFilters({
  cuisine,
  minRating,
  order,
  sortBy,
  onCuisineChange,
  onRatingChange,
  onOrderChange,
  onSortByChange,
  onReset,
}: RestaurantFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <input
        type="text"
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => onCuisineChange(e.target.value)}
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none focus:border-amber-500"
      />

      <select
        value={minRating}
        onChange={(e) =>
          onRatingChange(Number(e.target.value))
        }
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none focus:border-amber-500"
      >
        <option value={0}>All Ratings</option>
        <option value={1}>1+</option>
        <option value={2}>2+</option>
        <option value={3}>3+</option>
        <option value={4}>4+</option>
        <option value={5}>5</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          onSortByChange(e.target.value)
        }
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none focus:border-amber-500"
      >
        <option value="averageRating">Rating</option>
        <option value="createdAt">Newest</option>
        <option value="title">Name</option>
      </select>

      <select
        value={order}
        onChange={(e) =>
          onOrderChange(
            e.target.value as "ASC" | "DESC"
          )
        }
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none focus:border-amber-500"
      >
        <option value="DESC">Descending</option>
        <option value="ASC">Ascending</option>
      </select>

      <button
        type="button"
        onClick={onReset}
        className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
      >
        Reset
      </button>
    </div>
  );
}
