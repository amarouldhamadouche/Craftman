import { useQuery } from "@tanstack/react-query"

import { api } from "@/services/api"
import type { EpisodeItem } from "@/services/api/types"
import { getEpisodes } from "@/services/api/EpisodeHandler"

/** Fetches the React Native Radio podcast episode feed. */
export function usePodcastsQuery() {
  return useQuery<EpisodeItem[], Error>({
    queryKey: ["episodes"],
    queryFn: async () => {
      const response = await getEpisodes()
      if (response.kind === "ok") {
        return response.episodes
      }
      console.log(response, "response")
      throw new Error(`Error fetching episodes: ${JSON.stringify(response)}`)
    },
  })
}
