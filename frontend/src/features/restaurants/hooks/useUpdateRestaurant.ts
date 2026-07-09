import { useMutation } from "@tanstack/react-query";

import { restaurantApi } from "../api/restaurant.api";
import type { UpdateRestaurantDto } from "../types/restaurant.types";

export function useUpdateRestaurant() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateRestaurantDto;
    }) => restaurantApi.updateRestaurant(id, data),
  });
}
