import ReviewCard from "./ReviewCard";
import type { Review } from "../types/review.types";

interface ReviewListProps {
  reviews: Review[];
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

export default function ReviewList({
  reviews,
  onDelete,
  isDeleting,
}: ReviewListProps) {
  if (!reviews.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
        No reviews yet. Be the first reviewer for this restaurant.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
