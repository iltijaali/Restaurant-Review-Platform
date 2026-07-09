import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import RestaurantForm from "../components/RestaurantForm";
import { useCreateRestaurant } from "../hooks/useCreateRestaurant";
import type { CreateRestaurantDto } from "../types/restaurant.types";

function CreateRestaurantPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createRestaurant = useCreateRestaurant();

  const handleSubmit = async (
    values: CreateRestaurantDto
  ) => {
    try {
      await createRestaurant.mutateAsync(values);
      await queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      toast.success("Restaurant created");
      navigate("/my-restaurants");
    } catch {
      toast.error("Could not create restaurant");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create Restaurant
      </h1>

      <RestaurantForm
        submitLabel="Create Restaurant"
        isSubmitting={createRestaurant.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateRestaurantPage;
