import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import type { EpisodeItem } from "@/services/api/types"

export interface PodcastState {
  favorites: string[]
  favoritesOnly: boolean
  toggleFavoritesOnly: () => void
  hasFavorite: (episode: EpisodeItem) => boolean
  toggleFavorite: (episode: EpisodeItem) => void
}

/**
 * Manages podcast favorites and list filter state.
 */
export const usePodcastStore = create<PodcastState>()(
  immer((set, get) => ({
    favorites: [],
    favoritesOnly: false,

    toggleFavoritesOnly: () =>
      set((state) => {
        state.favoritesOnly = !state.favoritesOnly
      }),

    hasFavorite: (episode) => get().favorites.some((fav) => fav === episode.guid),

    toggleFavorite: (episode) =>
      set((state) => {
        const index = state.favorites.indexOf(episode.guid)
        if (index >= 0) {
          state.favorites.splice(index, 1)
        } else {
          state.favorites.push(episode.guid)
        }
      }),
  })),
)
