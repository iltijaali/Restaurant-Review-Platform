import { Link } from "react-router-dom";

import StarRating from "@/components/StarRating";

import type { Restaurant } from "../types/restaurant.types";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({
  restaurant,
}: Props) {
  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <img
        src={restaurant.previewImage}
        alt={restaurant.title}
        className="h-52 w-full bg-slate-100 object-cover"
      />

      <div className="space-y-3 p-4">
        <h2 className="text-xl font-bold text-slate-900">
          {restaurant.title}
        </h2>

        <p className="text-sm text-gray-600">
          Cuisine: {restaurant.cuisine}
        </p>

        <p className="text-sm text-gray-600">
          Location: {restaurant.location}
        </p>

        <p className="line-clamp-2 text-sm text-gray-500">
          {restaurant.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            <StarRating
              value={restaurant.averageRating}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
