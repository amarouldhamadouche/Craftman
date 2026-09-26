import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextInput } from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAuthStore, useAuthValidationError } from "@/store/auth.store"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const authPasswordInput = useRef<TextInput>(null)
  const { theme } = useUnistyles()

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const authEmail = useAuthStore((state) => state.authEmail)
  const setAuthEmail = useAuthStore((state) => state.setAuthEmail)
  const setAuthToken = useAuthStore((state) => state.setAuthToken)
  const validationError = useAuthValidationError()

  useEffect(() => {
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")
  }, [setAuthEmail])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isAuthPasswordHidden ? "airplane" : "airplane"}
            color={theme.colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, theme.colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={styles.logIn} />
      <Text tx="loginScreen:enterDetails" preset="subheading" style={styles.enterDetails} />
      {attemptsCount > 2 && (
        <Text tx="loginScreen:hint" size="sm" weight="light" style={styles.hint} />
      )}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={styles.textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen:emailFieldLabel"
        placeholderTx="loginScreen:emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={styles.textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen:passwordFieldLabel"
        placeholderTx="loginScreen:passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen:tapToLogIn"
        style={styles.tapButton}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  screenContentContainer: {
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  logIn: {
    marginBottom: theme.spacing.sm,
  },
  enterDetails: {
    marginBottom: theme.spacing.lg,
  },
  hint: {
    color: theme.colors.tint,
    marginBottom: theme.spacing.md,
  },
  textField: {
    marginBottom: theme.spacing.lg,
  },
  tapButton: {
    marginTop: theme.spacing.xs,
  },
}))
