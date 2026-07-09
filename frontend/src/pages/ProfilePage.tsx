import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import StarRating from "@/components/StarRating";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteReview } from "@/features/reviews/hooks/useDeleteReview";
import { useMyReviews } from "@/features/reviews/hooks/useMyReviews";

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useMyReviews(user?.id);
  const deleteReview = useDeleteReview();

  const handleDeleteReview = async (id: number) => {
    try {
      await deleteReview.mutateAsync(id);
      toast.success("Review deleted");
    } catch {
      toast.error("Could not delete review");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm hover:bg-amber-50"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-xl shadow-amber-100/50">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-700 px-6 py-7 text-white">
          <p className="text-sm font-medium uppercase tracking-wide text-amber-100">
            Reviewer account
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Reviewer Profile
          </h1>
        </div>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-700">
                Name
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {user?.name ?? "Not provided"}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-700">
                Email
              </p>
              <p className="mt-1 break-words font-semibold text-slate-900">
                {user?.email}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Role
              </p>
              <p className="mt-1 font-semibold capitalize text-slate-900">
                {user?.role}
              </p>
            </div>
          </div>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  My Reviews
                </h2>
                <p className="text-sm text-slate-500">
                  Reviews you have posted on restaurants.
                </p>
              </div>
            </div>

            {isLoading && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Loading your reviews...
              </div>
            )}

            {isError && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
                Could not load your reviews right now.
              </div>
            )}

            {!isLoading && !isError && !reviews.length && (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                You have not reviewed any restaurants yet.
              </div>
            )}

            <div className="space-y-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {review.restaurant?.title ??
                          "Restaurant"}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StarRating value={review.rating} />
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteReview(review.id)
                        }
                        disabled={deleteReview.isPending}
                        className="inline-flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                        aria-label="Delete review"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
