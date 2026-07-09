import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewApi } from "../api/review.api";
import type { CreateReviewDto } from "../types/review.types";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateReviewDto) =>
      reviewApi.createReview(body),
    onSuccess: (_review, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["reviews", variables.restaurantId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["restaurant", variables.restaurantId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
    },
  });
}
