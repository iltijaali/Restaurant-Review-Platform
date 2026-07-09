import type { Restaurant } from "../types/restaurant.types";

import RestaurantCard from "./RestaurantCard";

interface Props {
  restaurants: Restaurant[];
}

export default function RestaurantList({
  restaurants,
}: Props) {
  if (!restaurants.length) {
    return (
      <h2 className="text-center text-gray-500">
        No Restaurants Found
      </h2>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
}