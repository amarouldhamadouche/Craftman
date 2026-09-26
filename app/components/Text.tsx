import { ReactNode, forwardRef, ForwardedRef } from "react"
// eslint-disable-next-line no-restricted-imports
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import { TOptions } from "i18next"

import { isRTL, TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { typography } from "@/theme/typography"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = "default" | "bold" | "heading" | "subheading" | "formLabel" | "formHelper"

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export const Text = forwardRef(function Text(props: TextProps, ref: ForwardedRef<RNText>) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = props.preset ?? "default"
  const $presetStyleMap: Record<Presets, TextStyle> = {
    default: styles.presetDefault,
    bold: styles.presetBold,
    heading: styles.presetHeading,
    subheading: styles.presetSubheading,
    formLabel: styles.presetFormLabel,
    formHelper: styles.presetFormHelper,
  }
  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    $presetStyleMap[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles} ref={ref}>
      {content}
    </RNText>
  )
})

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}

const styles = StyleSheet.create((theme) => ({
  presetDefault: {
    fontSize: $sizeStyles.sm.fontSize,
    lineHeight: $sizeStyles.sm.lineHeight,
    fontFamily: typography.primary.normal,
    color: theme.colors.text,
  },
  presetBold: {
    fontSize: $sizeStyles.sm.fontSize,
    lineHeight: $sizeStyles.sm.lineHeight,
    fontFamily: typography.primary.bold,
    color: theme.colors.text,
  },
  presetHeading: {
    fontSize: $sizeStyles.xxl.fontSize,
    lineHeight: $sizeStyles.xxl.lineHeight,
    fontFamily: typography.primary.bold,
    color: theme.colors.text,
  },
  presetSubheading: {
    fontSize: $sizeStyles.lg.fontSize,
    lineHeight: $sizeStyles.lg.lineHeight,
    fontFamily: typography.primary.medium,
    color: theme.colors.text,
  },
  presetFormLabel: {
    fontSize: $sizeStyles.sm.fontSize,
    lineHeight: $sizeStyles.sm.lineHeight,
    fontFamily: typography.primary.medium,
    color: theme.colors.text,
  },
  presetFormHelper: {
    fontSize: $sizeStyles.sm.fontSize,
    lineHeight: $sizeStyles.sm.lineHeight,
    fontFamily: typography.primary.normal,
    color: theme.colors.text,
  },
}))
