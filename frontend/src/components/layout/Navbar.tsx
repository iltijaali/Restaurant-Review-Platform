import { Link, NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "rounded-full bg-white px-3 py-1.5 font-semibold text-amber-700 shadow-sm"
      : "rounded-full px-3 py-1.5 font-medium text-slate-100 hover:bg-white/10";

  return (
    <nav className="sticky top-0 z-20 border-b border-amber-300/30 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-800 text-white shadow-lg shadow-slate-950/20">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-white"
        >
          Restaurant Review Platform
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {isAuthenticated && (
            <>
              <NavLink
                to="/"
                className={linkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/restaurants"
                className={linkClass}
              >
                Restaurants
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === "owner" && (
            <NavLink
              to="/my-restaurants"
              className={linkClass}
            >
              My Restaurants
            </NavLink>
          )}

          {isAuthenticated &&
            user?.role === "reviewer" && (
              <NavLink
                to="/profile"
                className={linkClass}
              >
                Profile
              </NavLink>
            )}

          {isAuthenticated ? (
            <Button
              type="button"
              variant="outline"
              className="border-white/40 bg-white text-slate-900 hover:bg-amber-50"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={linkClass}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={linkClass}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
