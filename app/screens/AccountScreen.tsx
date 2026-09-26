import { FC } from "react"
import { Image, Pressable, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { accountSections } from "@/data/craftsmanData"
import type { DemoTabScreenProps } from "@/navigators/navigationTypes"

export const AccountScreen: FC<DemoTabScreenProps<"Account">> = function AccountScreen() {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text preset="bold" size="lg">
            Amar Ould Hamadouche
          </Text>
          <Text size="xs" style={styles.locationText}>
            Tiaret, Algeria
          </Text>
        </View>
        <Button text="Edit profile" preset="filled" style={styles.editButton} />
      </View>

      {accountSections.map((section) => (
        <View key={section.title} style={styles.sectionCard}>
          <Text preset="bold" size="sm" style={styles.sectionTitle}>
            {section.title}
          </Text>

          {section.items.map((item) => (
            <Pressable key={item} style={styles.listItem}>
              <Text size="sm">{item}</Text>
              <Text size="sm" style={styles.chevron}>
                ›
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  screenContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  profileCard: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: theme.spacing.md,
  },
  profileInfo: {
    marginBottom: theme.spacing.md,
  },
  locationText: {
    color: theme.colors.textDim,
    marginTop: theme.spacing.xs,
  },
  editButton: {
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  sectionCard: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 20,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderTopColor: theme.colors.separator,
    borderTopWidth: 1,
  },
  chevron: {
    color: theme.colors.textDim,
  },
}))
