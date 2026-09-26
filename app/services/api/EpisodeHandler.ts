import type { EpisodeItem } from "@/services/api/types"
import type { ApiFeedResponse } from "./types"
import type { GeneralApiProblem } from "./apiProblem"
import { api } from "./index"

export async function getEpisodes(): Promise<
  { kind: "ok"; episodes: EpisodeItem[] } | GeneralApiProblem
> {
  const result = await api.get<ApiFeedResponse>("api.json", {
    rss_url: "https://feeds.simplecast.com/hEI_f9Dx",
  })

  if (result.kind !== "ok") return result

  try {
    const episodes: EpisodeItem[] = result.data?.items.map((raw) => ({ ...raw })) ?? []
    return { kind: "ok", episodes }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.error(`Bad data: ${e.message}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}