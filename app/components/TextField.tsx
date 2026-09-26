import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
  ImageStyle,
  StyleProp,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { isRTL } from "@/i18n"
import { translate } from "@/i18n/translate"
import { $styles } from "@/theme/styles"

import { Text, TextProps } from "./Text"

export interface TextFieldAccessoryProps {
  style: StyleProp<ViewStyle | TextStyle | ImageStyle>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

/**
 * A component that allows for the entering and editing of text.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props
  const input = useRef<TextInput>(null)

  const { theme } = useUnistyles()
  const { colors } = theme

  const disabled = TextInputProps.editable === false || status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const $containerStyles = [$containerStyleOverride]

  const $labelStyles = [styles.label, LabelTextProps?.style]

  const $inputWrapperStyles = [
    $styles.row,
    styles.inputWrapper,
    status === "error" && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ]

  const $inputStyles: StyleProp<TextStyle> = [
    styles.input,
    disabled && { color: colors.textDim },
    isRTL && { textAlign: "right" as TextStyle["textAlign"] },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
  ]

  const $helperStyles = [
    styles.helper,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  /**
   *
   */
  function focusInput() {
    if (disabled) return

    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current as TextInput)

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!(label || labelTx) && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={styles.leftAccessory}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={styles.rightAccessory}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create((theme) => ({
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme.colors.palette.neutral200,
    borderColor: theme.colors.palette.neutral400,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    fontFamily: theme.typography.primary.normal,
    color: theme.colors.text,
    fontSize: 16,
    height: 24,
    // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.sm,
  },
  helper: {
    marginTop: theme.spacing.xs,
  },
  rightAccessory: {
    marginEnd: theme.spacing.xs,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  leftAccessory: {
    marginStart: theme.spacing.xs,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
}))
