import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import RestaurantForm from "../components/RestaurantForm";
import { useRestaurant } from "../hooks/useRestaurant";
import { useUpdateRestaurant } from "../hooks/useUpdateRestaurant";
import type { CreateRestaurantDto } from "../types/restaurant.types";

function EditRestaurantPage() {
  const { id } = useParams();
  const restaurantId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useRestaurant(restaurantId);
  const updateRestaurant = useUpdateRestaurant();

  const handleSubmit = async (
    values: CreateRestaurantDto
  ) => {
    try {
      await updateRestaurant.mutateAsync({
        id: restaurantId,
        data: values,
      });
      await queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["restaurant", restaurantId],
      });
      toast.success("Restaurant updated");
      navigate("/my-restaurants");
    } catch {
      toast.error("Could not update restaurant");
    }
  };

  if (isLoading) {
    return (
      <p className="p-6 text-center">
        Loading restaurant...
      </p>
    );
  }

  if (isError || !restaurant) {
    return (
      <p className="p-6 text-center text-red-500">
        Restaurant not found.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Restaurant
      </h1>

      <RestaurantForm
        restaurant={restaurant}
        submitLabel="Update Restaurant"
        isSubmitting={updateRestaurant.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditRestaurantPage;
