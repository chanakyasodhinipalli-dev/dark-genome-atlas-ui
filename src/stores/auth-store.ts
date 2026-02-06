import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "@/types";

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
  reset: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

type AuthStore = AuthState & AuthActions & { hasHydrated: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      hasHydrated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        // Clear persisted storage
        if (typeof window !== "undefined") {
          localStorage.removeItem("Deep Genome Atlas-genome-atlas-auth");
          // Clear pay-per-view usage tracking
          sessionStorage.removeItem("deepGenomeAtlas_downloadCount");
          sessionStorage.removeItem("deepGenomeAtlas_viewCount");
        }
      },

      reset: () => set(initialState),

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "Deep Genome Atlas-genome-atlas-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
