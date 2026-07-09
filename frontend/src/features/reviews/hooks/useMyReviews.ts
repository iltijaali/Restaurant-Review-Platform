import { useQuery } from "@tanstack/react-query";

import { reviewApi } from "../api/review.api";

export function useMyReviews(userId?: number) {
  return useQuery({
    queryKey: ["my-reviews", userId],
    queryFn: () => reviewApi.getMyReviews(userId!),
    enabled: !!userId,
    retry: false,
  });
}
