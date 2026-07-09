import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { restaurantApi } from "../api/restaurant.api";

import type { RestaurantQueryParams } from "../types/restaurant.types";

export function useRestaurants(
  params?: RestaurantQueryParams
) {
  return useQuery({
    queryKey: ["restaurants", params],

    queryFn: () =>
      restaurantApi.getRestaurants(params),
    placeholderData: keepPreviousData,
  });
}
