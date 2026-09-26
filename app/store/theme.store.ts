import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  Theme as NavTheme,
} from "@react-navigation/native"
import { UnistylesRuntime } from "react-native-unistyles"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { setImperativeTheming } from "@/theme/context.utils"
import { darkTheme, lightTheme } from "@/theme/theme"
import type { ImmutableThemeContextModeT, Theme, ThemeContextModeT } from "@/theme/types"

import { zustandMMKVStorage } from "./mmkvStorage"

export interface ThemeStoreState {
  themeScheme: ThemeContextModeT
  themeContext: ImmutableThemeContextModeT
  theme: Theme
  navigationTheme: NavTheme
  setThemeContextOverride: (newTheme: ThemeContextModeT) => void
  resolveThemeContext: (systemColorScheme: "light" | "dark" | null | undefined) => void
}

function buildThemeContext(
  themeScheme: ThemeContextModeT,
  systemColorScheme: "light" | "dark" | null | undefined,
): ImmutableThemeContextModeT {
  if (themeScheme) return themeScheme
  return systemColorScheme === "dark" ? "dark" : "light"
}

function applyThemeContext(themeContext: ImmutableThemeContextModeT, themeScheme: ThemeContextModeT) {
  const theme = themeContext === "dark" ? darkTheme : lightTheme
  const navigationTheme = themeContext === "dark" ? NavDarkTheme : NavDefaultTheme

  if (themeScheme === undefined) {
    UnistylesRuntime.setAdaptiveThemes(true)
  } else {
    UnistylesRuntime.setAdaptiveThemes(false)
    UnistylesRuntime.setTheme(themeContext)
  }

  setImperativeTheming(theme)

  return { themeContext, theme, navigationTheme }
}

/**
 * Persists theme preference and exposes resolved navigation/theme tokens.
 */
export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set, get) => ({
      themeScheme: undefined,
      ...applyThemeContext("light", undefined),

      setThemeContextOverride: (newTheme) => {
        set({ themeScheme: newTheme })
        const systemColorScheme = get().themeContext
        const themeContext = buildThemeContext(newTheme, systemColorScheme)
        set(applyThemeContext(themeContext, newTheme))
      },

      resolveThemeContext: (systemColorScheme) => {
        const { themeScheme } = get()
        const themeContext = buildThemeContext(themeScheme, systemColorScheme)
        set(applyThemeContext(themeContext, themeScheme))
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({ themeScheme: state.themeScheme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const themeContext = buildThemeContext(state.themeScheme, undefined)
          Object.assign(state, applyThemeContext(themeContext, state.themeScheme))
        }
      },
    },
  ),
)
