import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import { useAuth } from "@/hooks/useAuth";

import type { Review } from "../types/review.types";

interface ReviewCardProps {
  review: Review;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

export default function ReviewCard({
  review,
  onDelete,
  isDeleting,
}: ReviewCardProps) {
  const { user } = useAuth();
  const canDelete = user?.id === review.userId;

  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-slate-900">
            {review.user?.name ??
              review.user?.email ??
              "Reviewer"}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
            <StarRating value={review.rating} />
          </span>

          {canDelete && onDelete && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onDelete(review.id)}
              disabled={isDeleting}
              aria-label="Delete review"
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-700">
        {review.comment}
      </p>
    </article>
  );
}
