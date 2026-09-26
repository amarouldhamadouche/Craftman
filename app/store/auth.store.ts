import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { zustandMMKVStorage } from "./mmkvStorage"

export interface AuthState {
  authToken?: string
  authEmail?: string
  setAuthToken: (token?: string) => void
  setAuthEmail: (email: string) => void
  logout: () => void
}

/**
 * Persists authentication credentials and exposes auth actions.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authToken: undefined,
      authEmail: "",
      setAuthToken: (token) => set({ authToken: token }),
      setAuthEmail: (email) => set({ authEmail: email }),
      logout: () => set({ authToken: undefined, authEmail: "" }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => zustandMMKVStorage),
    },
  ),
)

/** Returns whether the user is currently authenticated. */
export function useIsAuthenticated() {
  return useAuthStore((state) => !!state.authToken)
}

/** Returns the email validation error message, or an empty string if valid. */
export function useAuthValidationError() {
  const authEmail = useAuthStore((state) => state.authEmail)

  if (!authEmail || authEmail.length === 0) return "can't be blank"
  if (authEmail.length < 6) return "must be at least 6 characters"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) return "must be a valid email address"
  return ""
}
