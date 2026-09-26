import { ComponentType, useState } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import { StyleSheet } from "react-native-unistyles"
import { EaseView } from "react-native-ease"

import { $styles } from "@/theme/styles"

import { Text, TextProps } from "./Text"

type Presets = "default" | "filled" | "reversed"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>

  scale?: number
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    scale,
    ...rest
  } = props

  const [pressed, setPressed] = useState<Boolean>(false)

  const preset: Presets = props.preset ?? "default"
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<ViewStyle>} The view style based on the pressed state.
   */
  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $styles.row,
      styles[$viewPresetKeys[preset]],
      $viewStyleOverride,
      !!pressed && [styles[$pressedViewPresetKeys[preset]], $pressedViewStyleOverride],
      !!disabled && $disabledViewStyleOverride,
    ]
  }
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<TextStyle>} The text style based on the pressed state.
   */
  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      styles[$textPresetKeys[preset]],
      $textStyleOverride,
      !!pressed && [styles.pressedText, $pressedTextStyleOverride],
      !!disabled && $disabledTextStyleOverride,
    ]
  }

  return (
    <EaseView
      animate={{
        scale: pressed ? scale || 0.97 : 1,
      }}
      transition={{
        type: "spring",
        damping: 16,
      }}
    >
      <Pressable
        style={({pressed})=> $viewStyle({pressed})}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        {...rest}
        disabled={disabled}
      >
        {(state) => (
          <>
            {!!LeftAccessory && (
              <LeftAccessory
                style={styles.leftAccessory}
                pressableState={state}
                disabled={disabled}
              />
            )}

            <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
              {children}
            </Text>

            {!!RightAccessory && (
              <RightAccessory
                style={styles.rightAccessory}
                pressableState={state}
                disabled={disabled}
              />
            )}
          </>
        )}
      </Pressable>
    </EaseView>
  )
}

const $viewPresetKeys = {
  default: "viewDefault",
  filled: "viewFilled",
  reversed: "viewReversed",
} as const

const $pressedViewPresetKeys = {
  default: "pressedViewDefault",
  filled: "pressedViewFilled",
  reversed: "pressedViewReversed",
} as const

const $textPresetKeys = {
  default: "textDefault",
  filled: "textFilled",
  reversed: "textReversed",
} as const

const styles = StyleSheet.create((theme) => ({
  rightAccessory: {
    marginStart: theme.spacing.xs,
    zIndex: 1,
  },
  leftAccessory: {
    marginEnd: theme.spacing.xs,
    zIndex: 1,
  },
  viewDefault: {
    minHeight: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.palette.neutral400,
    backgroundColor: theme.colors.palette.primary100,
  },
  viewFilled: {
    minHeight: 56,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    overflow: "hidden",
    backgroundColor: theme.colors.palette.neutral300,
  },
  viewReversed: {
    minHeight: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    overflow: "hidden",
    backgroundColor: theme.colors.palette.primary100,
  },
  textDefault: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: theme.typography.primary.medium,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
  },
  textFilled: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: theme.typography.primary.medium,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
  },
  textReversed: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: theme.typography.primary.medium,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
    color: theme.colors.palette.neutral100,
  },
  pressedViewDefault: {
    backgroundColor: theme.colors.palette.primary200,
  },
  pressedViewFilled: {
    backgroundColor: theme.colors.palette.primary400,
  },
  pressedViewReversed: {
    backgroundColor: theme.colors.palette.primary300,
  },
  pressedText: {
    opacity: 0.9,
  },
}))
