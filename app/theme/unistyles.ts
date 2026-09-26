import { StyleSheet } from "react-native-unistyles"

import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { spacing as spacingLight } from "./spacing"
import { spacing as spacingDark } from "./spacingDark"
import { timing } from "./timing"
import { typography } from "./typography"

const lightTheme = {
  colors: colorsLight,
  spacing: spacingLight,
  typography,
  timing,
  isDark: false,
}

const darkTheme = {
  colors: colorsDark,
  spacing: spacingDark,
  typography,
  timing,
  isDark: true,
}

type AppThemes = {
  light: typeof lightTheme
  dark: typeof darkTheme
}

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: { light: lightTheme, dark: darkTheme },
  settings: { adaptiveThemes: true },
})

export { lightTheme, darkTheme }
