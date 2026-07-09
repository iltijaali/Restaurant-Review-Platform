import { Route, Routes } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import RestaurantsPage from "@/features/restaurants/pages/RestaurantsPage";
import RestaurantDetailsPage from "@/features/restaurants/pages/RestaurantDetailsPage";
import CreateRestaurantPage from "@/features/restaurants/pages/CreateRestaurantPage";
import EditRestaurantPage from "@/features/restaurants/pages/EditRestaurantPage";
import MyRestaurantsPage from "@/features/restaurants/pages/MyRestaurantsPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/restaurants"
            element={<RestaurantsPage />}
          />
          <Route
            path="/restaurants/:id"
            element={<RestaurantDetailsPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            element={
              <RoleProtectedRoute allowedRole="owner" />
            }
          >
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
            <Route
              path="/my-restaurants"
              element={<MyRestaurantsPage />}
            />
            <Route
              path="/restaurants/create"
              element={<CreateRestaurantPage />}
            />
            <Route
              path="/restaurants/:id/edit"
              element={<EditRestaurantPage />}
            />
          </Route>
        </Route>
      </Route>

      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
