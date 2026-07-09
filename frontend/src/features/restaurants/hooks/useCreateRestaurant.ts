import { useMutation } from "@tanstack/react-query";

import { restaurantApi } from "../api/restaurant.api";

export function useCreateRestaurant() {
  return useMutation({
    mutationFn: restaurantApi.createRestaurant,
  });
}
