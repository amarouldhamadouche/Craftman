import { useMemo } from "react"

import { translate } from "@/i18n/translate"
import { usePodcastStore } from "@/store/podcast.store"
import type { EpisodeItem } from "@/services/api/types"
import { formatDate } from "@/utils/formatDate"

/** Formats and enriches a single episode with favorites and display metadata. */
export function useEpisode(episode: EpisodeItem) {
  const hasFavorite = usePodcastStore((state) => state.hasFavorite)
  const isFavorite = hasFavorite(episode)

  const datePublished = useMemo(() => {
    try {
      const formatted = formatDate(episode.pubDate)
      return {
        textLabel: formatted,
        accessibilityLabel: translate("demoPodcastListScreen:accessibility.publishLabel", {
          date: formatted,
        }),
      }
    } catch {
      return { textLabel: "", accessibilityLabel: "" }
    }
  }, [episode.pubDate])

  const duration = useMemo(() => {
    const seconds = Number(episode.enclosure?.duration ?? 0)
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor((seconds % 3600) % 60)
    return {
      textLabel: `${h > 0 ? `${h}:` : ""}${m > 0 ? `${m}:` : ""}${s}`,
      accessibilityLabel: translate("demoPodcastListScreen:accessibility.durationLabel", {
        hours: h,
        minutes: m,
        seconds: s,
      }),
    }
  }, [episode.enclosure?.duration])

  const parsedTitleAndSubtitle = useMemo(() => {
    const trimmedTitle = episode.title?.trim()
    const titleMatches = trimmedTitle?.match(/^(RNR.*\d)(?: - )(.*$)/)
    if (titleMatches && titleMatches.length === 3) {
      return { title: titleMatches[1], subtitle: titleMatches[2] }
    }
    return { title: trimmedTitle, subtitle: "" }
  }, [episode.title])

  return {
    isFavorite,
    datePublished,
    duration,
    parsedTitleAndSubtitle,
  }
}
