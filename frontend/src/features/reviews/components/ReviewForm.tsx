import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useCreateReview } from "../hooks/useCreateReview";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating.")
    .max(5, "Rating cannot be more than 5."),
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters."),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  restaurantId: number;
}

export default function ReviewForm({
  restaurantId,
}: ReviewFormProps) {
  const createReview = useCreateReview();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  async function onSubmit(values: ReviewFormValues) {
    try {
      await createReview.mutateAsync({
        ...values,
        restaurantId,
      });

      reset({ rating: 5, comment: "" });
      toast.success("Review added successfully");
    } catch {
      toast.error("Could not add review");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-orange-100 bg-white p-4 shadow-lg shadow-orange-100/50"
    >
      <div>
        <Label htmlFor="rating" className="text-slate-700">
          Rating
        </Label>
        <select
          id="rating"
          className="mt-1 h-10 w-full rounded-lg border border-orange-100 px-3 text-sm focus:border-orange-400 focus:outline-none"
          {...register("rating", {
            valueAsNumber: true,
          })}
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Very good</option>
          <option value={3}>3 - Good</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-500">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="comment" className="text-slate-700">
          Comment
        </Label>
        <textarea
          id="comment"
          rows={4}
          placeholder="Share your experience"
          className="mt-1 w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-500">
            {errors.comment.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-orange-600 text-white hover:bg-orange-700"
        disabled={createReview.isPending}
      >
        {createReview.isPending
          ? "Submitting..."
          : "Submit Review"}
      </Button>
    </form>
  );
}
