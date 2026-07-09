import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { restaurantApi } from "../api/restaurant.api";
import { useDeleteRestaurant } from "../hooks/useDeleteRestaurant";

function MyRestaurantsPage() {
  const queryClient = useQueryClient();
  const deleteRestaurant = useDeleteRestaurant();

  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: restaurantApi.getMyRestaurants,
  });

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Delete this restaurant?"
    );

    if (!confirmed) return;

    try {
      await deleteRestaurant.mutateAsync(id);
      await queryClient.invalidateQueries({
        queryKey: ["my-restaurants"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      toast.success("Restaurant deleted");
    } catch {
      toast.error("Could not delete restaurant");
    }
  };

  if (isLoading) {
    return (
      <p className="p-6 text-center">
        Loading your restaurants...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        Could not load your restaurants.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            My Restaurants
          </h1>
          <p className="mt-1 text-gray-600">
            Manage restaurants that belong to your owner
            account.
          </p>
        </div>

        <Link
          to="/restaurants/create"
          className="inline-flex h-8 items-center rounded-lg bg-slate-900 px-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Create Restaurant
        </Link>
      </div>

      {!restaurants.length ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          You have not created any restaurants yet.
        </div>
      ) : (
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex flex-col gap-4 rounded-lg border bg-white p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {restaurant.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {restaurant.cuisine} -{" "}
                  {restaurant.location}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  className="inline-flex h-8 items-center rounded-lg border px-3 text-sm font-medium hover:bg-gray-50"
                >
                  View
                </Link>
                <Link
                  to={`/restaurants/${restaurant.id}/edit`}
                  className="inline-flex h-8 items-center rounded-lg border px-3 text-sm font-medium hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(restaurant.id)
                  }
                  disabled={deleteRestaurant.isPending}
                  className="inline-flex h-8 items-center rounded-lg bg-red-50 px-3 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRestaurantsPage;
