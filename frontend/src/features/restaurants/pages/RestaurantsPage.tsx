import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RestaurantFilters from "../components/RestaurantFilters";
import SearchBar from "../components/SearchBar";
import RestaurantList from "../components/RestaurantList";
import Pagination from "../components/Pagination";
import { useRestaurants } from "../hooks/useRestaurants";
import type { RestaurantQueryParams } from "../types/restaurant.types";

interface RestaurantsPageProps {
  compactHeader?: boolean;
}

export default function RestaurantsPage({
  compactHeader = false,
}: RestaurantsPageProps) {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 9);
  const search = searchParams.get("search") ?? "";
  const cuisine = searchParams.get("cuisine") ?? "";
  const minRating = Number(
    searchParams.get("minRating") ?? 0
  );
  const sortBy =
    searchParams.get("sortBy") ?? "averageRating";
  const order =
    searchParams.get("order") === "ASC"
      ? "ASC"
      : searchParams.get("order") === "DESC"
        ? "DESC"
        : localStorage.getItem("restaurant-sort") === "ASC"
          ? "ASC"
          : "DESC";

  const [searchInput, setSearchInput] =
    useState(search);
  const [cuisineInput, setCuisineInput] =
    useState(cuisine);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    setCuisineInput(cuisine);
  }, [cuisine]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmedSearch = searchInput.trim();
      const trimmedCuisine = cuisineInput.trim();

      if (
        trimmedSearch === search &&
        trimmedCuisine === cuisine
      ) {
        return;
      }

      const next = new URLSearchParams(searchParams);

      if (trimmedSearch) {
        next.set("search", trimmedSearch);
      } else {
        next.delete("search");
      }

      if (trimmedCuisine) {
        next.set("cuisine", trimmedCuisine);
      } else {
        next.delete("cuisine");
      }

      next.set("page", "1");

      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next);
      }
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [
    cuisine,
    cuisineInput,
    search,
    searchInput,
    searchParams,
    setSearchParams,
  ]);

  const params: RestaurantQueryParams = {
    page,
    limit,
    search: search.trim() || undefined,
    cuisine: cuisine.trim() || undefined,
    minRating: minRating || undefined,
    sortBy,
    order,
  };

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useRestaurants(params);

  const updateParam = (
    key: string,
    value: string | number
  ) => {
    const next = new URLSearchParams(searchParams);

    if (value === "" || value === 0) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }

    if (key !== "page") {
      next.set("page", "1");
    }

    if (key === "order") {
      localStorage.setItem("restaurant-sort", String(value));
    }

    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchInput("");
    setCuisineInput("");
    setSearchParams(new URLSearchParams());
  };

  if (isLoading && !data) {
    return (
      <h2 className="p-10 text-center text-slate-700">
        Loading Restaurants...
      </h2>
    );
  }

  if (isError) {
    return (
      <h2 className="p-10 text-center text-red-500">
        Failed to load restaurants.
      </h2>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-4 sm:px-4">
      {!compactHeader && (
        <div className="mb-8 rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-amber-700 px-6 py-7 text-white shadow-lg shadow-slate-200">
          <h1 className="text-3xl font-extrabold">
            Restaurants
          </h1>
        </div>
      )}

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
          />
        </div>

        <RestaurantFilters
          cuisine={cuisineInput}
          minRating={minRating}
          order={order}
          sortBy={sortBy}
          onCuisineChange={setCuisineInput}
          onRatingChange={(value) =>
            updateParam("minRating", value)
          }
          onOrderChange={(value) =>
            updateParam("order", value)
          }
          onSortByChange={(value) =>
            updateParam("sortBy", value)
          }
          onReset={resetFilters}
        />
      </div>

      {isFetching && (
        <p className="mb-4 text-sm font-medium text-amber-700">
          Updating restaurants...
        </p>
      )}

      <RestaurantList
        restaurants={data?.data ?? []}
      />

      {data?.meta && data.meta.totalPages > 1 && (
        <Pagination
          page={data.meta.page}
          totalPages={data.meta.totalPages}
          onPrevious={() =>
            updateParam("page", Math.max(1, page - 1))
          }
          onNext={() =>
            updateParam(
              "page",
              Math.min(data.meta.totalPages, page + 1)
            )
          }
        />
      )}
    </div>
  );
}
