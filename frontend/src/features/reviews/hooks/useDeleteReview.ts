import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewApi } from "../api/review.api";

export function useDeleteReview(restaurantId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.deleteReview,
    onSuccess: () => {
      if (restaurantId) {
        void queryClient.invalidateQueries({
          queryKey: ["reviews", restaurantId],
        });
        void queryClient.invalidateQueries({
          queryKey: ["restaurant", restaurantId],
        });
      }

      void queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
    },
  });
}
