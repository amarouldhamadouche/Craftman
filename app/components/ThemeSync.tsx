import { useEffect } from "react"
import { useColorScheme } from "react-native"

import { useThemeStore } from "@/store/theme.store"

/** Keeps the theme store in sync with the system color scheme. */
export function ThemeSync() {
  const systemColorScheme = useColorScheme()
  const resolveThemeContext = useThemeStore((state) => state.resolveThemeContext)

  useEffect(() => {
    const resolvedScheme =
      systemColorScheme === "dark" || systemColorScheme === "light"
        ? systemColorScheme
        : undefined
    resolveThemeContext(resolvedScheme)
  }, [resolveThemeContext, systemColorScheme])

  return null
}
