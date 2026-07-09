import { useState } from "react";

export function useRestaurantFilters() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [order, setOrder] = useState<"ASC" | "DESC">(
    () =>
      (localStorage.getItem("restaurant-sort") as
        | "ASC"
        | "DESC") ?? "DESC"
  );

  const updateOrder = (
    value: "ASC" | "DESC"
  ) => {
    setOrder(value);
    localStorage.setItem(
      "restaurant-sort",
      value
    );
  };

  return {
    search,
    cuisine,
    minRating,
    page,
    limit,
    order,

    setSearch,
    setCuisine,
    setMinRating,
    setPage,
    updateOrder,
  };
}