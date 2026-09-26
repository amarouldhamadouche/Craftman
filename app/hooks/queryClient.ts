import { QueryClient } from "@tanstack/react-query"

/** Shared React Query client instance for the app. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
})
