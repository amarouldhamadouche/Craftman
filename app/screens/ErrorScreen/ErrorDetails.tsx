import { ErrorInfo } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="airplane" size={64} />
        <Text style={styles.heading} preset="subheading" tx="errorScreen:title" />
        <Text tx="errorScreen:friendlySubtitle" />
      </View>

      <ScrollView
        style={styles.errorSection}
        contentContainerStyle={styles.errorSectionContentContainer}
      >
        <Text style={styles.errorContent} weight="bold" text={`${props.error}`.trim()} />
        <Text
          selectable
          style={styles.errorBacktrace}
          text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
        />
      </ScrollView>

      <Button preset="reversed" style={styles.resetButton} onPress={props.onReset} tx="errorScreen:reset" />
    </Screen>
  )
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const styles = StyleSheet.create((theme) => ({
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    flex: 1,
  },
  heading: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  errorSection: {
    flex: 2,
    backgroundColor: theme.colors.separator,
    marginVertical: theme.spacing.md,
    borderRadius: 6,
  },
  errorSectionContentContainer: {
    padding: theme.spacing.md,
  },
  errorContent: {
    color: theme.colors.error,
  },
  errorBacktrace: {
    marginTop: theme.spacing.md,
    color: theme.colors.textDim,
  },
  resetButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xxl,
  },
}))
