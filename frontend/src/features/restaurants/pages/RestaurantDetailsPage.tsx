import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import StarRating from "@/components/StarRating";
import ReviewForm from "@/features/reviews/components/ReviewForm";
import ReviewList from "@/features/reviews/components/ReviewList";
import { useDeleteReview } from "@/features/reviews/hooks/useDeleteReview";
import { useReviews } from "@/features/reviews/hooks/useReviews";

import { useRestaurant } from "../hooks/useRestaurant";

function RestaurantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurantId = Number(id);
  const { user } = useAuth();

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useRestaurant(restaurantId);
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
  } = useReviews(restaurantId);
  const deleteReview = useDeleteReview(restaurantId);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview.mutateAsync(reviewId);
      toast.success("Review deleted");
    } catch {
      toast.error("Could not delete review");
    }
  };

  if (!restaurantId) {
    return (
      <p className="p-6 text-center text-red-500">
        Invalid restaurant.
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="p-6 text-center">
        Loading restaurant...
      </p>
    );
  }

  if (isError || !restaurant) {
    return (
      <p className="p-6 text-center text-red-500">
        Restaurant not found.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm hover:bg-amber-50"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <div className="overflow-hidden rounded-lg border bg-white">
        <img
          src={restaurant.previewImage}
          alt={restaurant.title}
          className="h-80 w-full object-cover"
        />

        <div className="space-y-5 p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {restaurant.title}
              </h1>
              <p className="mt-2 text-gray-600">
                {restaurant.cuisine} cuisine in{" "}
                {restaurant.location}
              </p>
            </div>

            <span className="h-fit rounded-full bg-amber-50 px-4 py-2 font-semibold text-amber-700">
              <StarRating
                value={restaurant.averageRating}
              />
            </span>
          </div>

          <p className="leading-7 text-gray-700">
            {restaurant.description}
          </p>

          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            <p className="font-semibold text-slate-900">
              Owner
            </p>
            <p>
              {restaurant.owner?.name ??
                restaurant.owner?.email ??
                "Restaurant owner"}
            </p>
            {restaurant.owner?.email && (
              <p>{restaurant.owner.email}</p>
            )}
          </div>
        </div>
      </div>

      <section
        className={
          user?.role === "reviewer"
            ? "grid gap-6 lg:grid-cols-[1fr_380px]"
            : "grid gap-6"
        }
      >
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Reviews
          </h2>

          {reviewsLoading ? (
            <p>Loading reviews...</p>
          ) : (
            <ReviewList
              reviews={reviews}
              onDelete={handleDeleteReview}
              isDeleting={deleteReview.isPending}
            />
          )}
        </div>

        {user?.role === "reviewer" && (
          <aside>
            <h2 className="mb-4 text-2xl font-semibold">
              Add a review
            </h2>
            <ReviewForm restaurantId={restaurantId} />
          </aside>
        )}
      </section>
    </div>
  );
}

export default RestaurantDetailsPage;
