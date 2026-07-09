import { useMutation } from "@tanstack/react-query";

import { restaurantApi } from "../api/restaurant.api";

export function useDeleteRestaurant() {
  return useMutation({
    mutationFn: restaurantApi.deleteRestaurant,
  });
}
