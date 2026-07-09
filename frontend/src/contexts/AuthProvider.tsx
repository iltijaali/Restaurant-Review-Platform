import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import type {
  User,
  AuthContextType,
} from "@/types/auth.types";

import { getProfile } from "@/features/auth/api/auth.api";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        if (!token) return;

        const profile = await getProfile();

        setUser(profile);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  function login(token: string, user: User) {
    localStorage.setItem("access_token", token);

    setToken(token);

    setUser(user);
  }

  function logout() {
    localStorage.removeItem("access_token");

    setToken(null);

    setUser(null);
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}