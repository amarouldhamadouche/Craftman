import { ReactNode } from "react"
import { View, ViewStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { $styles } from "@/theme/styles"

interface DemoUseCaseProps {
  name: TxKeyPath
  description?: TxKeyPath
  layout?: "column" | "row"
  itemStyle?: ViewStyle
  children: ReactNode
}

/**
 * @param {DemoUseCaseProps} props - The props for the `DemoUseCase` component.
 * @returns {JSX.Element} The rendered `DemoUseCase` component.
 */
export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children, layout = "column", itemStyle = {} } = props

  return (
    <View>
      <Text style={styles.name}>{translate(name)}</Text>
      {description && <Text style={styles.description}>{translate(description)}</Text>}

      <View style={[itemStyle, layout === "row" && $styles.row, styles.item]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  description: {
    marginTop: theme.spacing.md,
  },
  item: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 8,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
  name: {
    fontFamily: theme.typography.primary.bold,
  },
}))
