import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  allowedRole: "owner" | "reviewer";
}

export default function RoleProtectedRoute({
  allowedRole,
}: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}