import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="rounded-lg border bg-white p-8">
        <h1 className="text-3xl font-bold">
          Owner Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Create, edit, and manage your restaurant listings
          from one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/my-restaurants"
            className="inline-flex h-8 items-center rounded-lg bg-slate-900 px-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Manage Restaurants
          </Link>
          <Link
            to="/restaurants/create"
            className="inline-flex h-8 items-center rounded-lg border px-3 text-sm font-medium hover:bg-gray-50"
          >
            Add Restaurant
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
