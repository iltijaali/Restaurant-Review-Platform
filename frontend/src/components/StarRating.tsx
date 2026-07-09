import { Star } from "lucide-react";

interface StarRatingProps {
  value: number | string;
  showValue?: boolean;
}

export default function StarRating({
  value,
  showValue = true,
}: StarRatingProps) {
  const rating = Number(value || 0);
  const roundedRating = Math.round(rating);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < roundedRating;

          return (
            <Star
              key={index}
              className="size-4"
              fill={filled ? "currentColor" : "none"}
              strokeWidth={filled ? 0 : 2}
            />
          );
        })}
      </span>

      {showValue && (
        <span className="text-sm font-semibold text-slate-700">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
