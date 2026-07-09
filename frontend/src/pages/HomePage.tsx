import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import RestaurantsPage from "@/features/restaurants/pages/RestaurantsPage";

export default function HomePage() {
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Welcome back
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Restaurant Review Platform
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/restaurants"
              className="inline-flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              All Restaurants
            </Link>

            {isOwner && (
              <>
                <Link
                  to="/my-restaurants"
                  className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  My Restaurants
                </Link>
                <Link
                  to="/restaurants/create"
                  className="inline-flex h-10 items-center rounded-lg bg-amber-600 px-4 text-sm font-semibold text-white hover:bg-amber-700"
                >
                  Add Restaurant
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <RestaurantsPage compactHeader />
    </div>
  );
}
