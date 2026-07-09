import api from "@/api/axios";

import { restaurantApi } from "@/features/restaurants/api/restaurant.api";

import type {
  CreateReviewDto,
  Review,
} from "../types/review.types";

export const reviewApi = {
  getReviewsByRestaurant: async (restaurantId: number) => {
    const { data } = await api.get<Review[]>(
      `/reviews/restaurant/${restaurantId}`
    );

    return data;
  },

  getMyReviews: async (userId: number) => {
    const firstPage = await restaurantApi.getRestaurants({
      page: 1,
      limit: 100,
    });

    const extraPages =
      firstPage.meta.totalPages > 1
        ? await Promise.all(
            Array.from(
              {
                length: firstPage.meta.totalPages - 1,
              },
              (_, index) =>
                restaurantApi.getRestaurants({
                  page: index + 2,
                  limit: 100,
                })
            )
          )
        : [];

    const restaurants = [
      ...firstPage.data,
      ...extraPages.flatMap((page) => page.data),
    ];

    const reviewGroups = await Promise.all(
      restaurants.map(async (restaurant) => {
        const reviews =
          await reviewApi.getReviewsByRestaurant(
            restaurant.id
          );

        return reviews
          .filter((review) => review.userId === userId)
          .map((review) => ({
            ...review,
            restaurant: {
              id: restaurant.id,
              title: restaurant.title,
              cuisine: restaurant.cuisine,
              location: restaurant.location,
            },
          }));
      })
    );

    return reviewGroups
      .flat()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
  },

  createReview: async (body: CreateReviewDto) => {
    const { data } = await api.post<Review>(
      "/reviews",
      body
    );

    return data;
  },

  deleteReview: async (id: number) => {
    const { data } = await api.delete(`/reviews/${id}`);

    return data;
  },
};
