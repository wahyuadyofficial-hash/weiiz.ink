import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  username: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "admin";
  isVerified: boolean;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// ─── Hook ─────────────────────────────────────────────────
export function useAuth(options?: { redirectTo?: string; redirectIfFound?: boolean }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
    isAdmin: false,
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) throw new Error("Unauthenticated");
      const data = await res.json();
      const user: AuthUser = data.user || data;
      setState({ user, loading: false, isAuthenticated: true, isAdmin: user.role === "admin" });

      // Redirect jika sudah login dan redirectIfFound = true (misal halaman login)
      if (options?.redirectIfFound && options.redirectTo) {
        router.replace(options.redirectTo);
      }
    } catch {
      setState({ user: null, loading: false, isAuthenticated: false, isAdmin: false });
      // Redirect jika belum login
      if (options?.redirectTo && !options?.redirectIfFound) {
        router.replace(options.redirectTo);
      }
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setState({ user: null, loading: false, isAuthenticated: false, isAdmin: false });
      router.replace("/login");
    }
  }, [router]);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  return { ...state, logout, updateUser, refetch: fetchUser };
}
