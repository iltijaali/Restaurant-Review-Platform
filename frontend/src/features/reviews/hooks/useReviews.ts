import { useQuery } from "@tanstack/react-query";

import { reviewApi } from "../api/review.api";

export function useReviews(restaurantId: number) {
  return useQuery({
    queryKey: ["reviews", restaurantId],
    queryFn: () =>
      reviewApi.getReviewsByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
}
