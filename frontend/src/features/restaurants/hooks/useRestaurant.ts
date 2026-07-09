import { useQuery } from "@tanstack/react-query";

import { restaurantApi } from "../api/restaurant.api";

export function useRestaurant(id: number) {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurantApi.getRestaurant(id),
    enabled: !!id,
  });
}
