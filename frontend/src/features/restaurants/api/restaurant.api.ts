import api from "@/api/axios";

import type {
  Restaurant,
  RestaurantQueryParams,
  RestaurantResponse,
  CreateRestaurantDto,
  UpdateRestaurantDto,
} from "../types/restaurant.types";

export const restaurantApi = {
  getRestaurants: async (
    params?: RestaurantQueryParams
  ) => {
    const { data } = await api.get<RestaurantResponse>(
      "/restaurants",
      {
        params,
      }
    );

    return data;
  },

  getRestaurant: async (id: number) => {
    const { data } = await api.get<Restaurant>(
      `/restaurants/${id}`
    );

    return data;
  },

  getMyRestaurants: async () => {
    const { data } = await api.get<Restaurant[]>(
      "/restaurants/my-restaurants"
    );

    return data;
  },

  createRestaurant: async (
    body: CreateRestaurantDto
  ) => {
    const { data } = await api.post(
      "/restaurants",
      body
    );

    return data;
  },

  updateRestaurant: async (
    id: number,
    body: UpdateRestaurantDto
  ) => {
    const { data } = await api.patch(
      `/restaurants/${id}`,
      body
    );

    return data;
  },

  deleteRestaurant: async (id: number) => {
    const { data } = await api.delete(
      `/restaurants/${id}`
    );

    return data;
  },
};