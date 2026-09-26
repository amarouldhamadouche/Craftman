import { FC } from "react"
import { Image, Pressable, ScrollView, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { craftsmen } from "@/data/craftsmanData"
import type { ShowroomStackScreenProps } from "@/navigators/navigationTypes"

export const CraftsmanDetailScreen: FC<ShowroomStackScreenProps<"CraftsmanDetail">> = function CraftsmanDetailScreen({
  route,
  navigation,
}) {
  const craftsman = craftsmen.find((item) => item.id === route.params?.craftsmanId)

  if (!craftsman) {
    return (
      <Screen preset="fixed" contentContainerStyle={styles.emptyState}>
        <Text preset="bold">Craftsman not found</Text>
        <Button text="Go back" onPress={() => navigation.goBack()} style={styles.backButton} />
      </Screen>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButtonWrap}>
        <View style={styles.backButton}>
          <Icon icon="arrow-right" size={16} color="#111827" />
        </View>
      </Pressable>

      <Image source={{ uri: craftsman.coverImage }} style={styles.coverImage} />

      <View style={styles.headerCard}>
        <Image source={{ uri: craftsman.avatar }} style={styles.avatar} />

        <View style={styles.headerTop}>
          <View style={styles.headingWrap}>
            <Text preset="bold" size="lg">
              {craftsman.name}
            </Text>
            <Text size="sm" style={styles.profession}>
              {craftsman.profession}
            </Text>
          </View>

          <Button text="Contact" preset="filled" style={styles.contactButton} />
        </View>

        <View style={styles.ratingRow}>
          <Text size="sm">⭐ {craftsman.rating}</Text>
          <Text size="sm" style={styles.locationText}>
            {craftsman.location}
          </Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text preset="bold" size="sm" style={styles.sectionTitle}>
          About
        </Text>
        <Text size="sm" style={styles.textMuted}>
          {craftsman.about}
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text preset="bold" size="sm" style={styles.sectionTitle}>
          Services
        </Text>
        <View style={styles.tagsWrap}>
          {craftsman.services.map((service) => (
            <View key={service} style={styles.tag}>
              <Text size="xs">{service}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text preset="bold" size="sm" style={styles.sectionTitle}>
          Portfolio
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.portfolioList}>
          {craftsman.portfolio.map((imageUrl, index) => (
            <Image key={`${craftsman.id}-${index}`} source={{ uri: imageUrl }} style={styles.portfolioImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionCard}>
        <Text preset="bold" size="sm" style={styles.sectionTitle}>
          Reviews
        </Text>
        {craftsman.reviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <Text preset="bold" size="xs">
              {review.author}
            </Text>
            <Text size="xs" style={styles.reviewRating}>
              {"⭐".repeat(review.rating)}
            </Text>
            <Text size="sm" style={styles.textMuted}>
              {review.comment}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  screenContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  backButtonWrap: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.palette.neutral100,
    alignItems: "center",
    justifyContent: "center",
  },
  coverImage: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    marginBottom: theme.spacing.md,
  },
  headerCard: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginTop: -48,
    marginBottom: theme.spacing.sm,
    borderWidth: 3,
    borderColor: theme.colors.palette.neutral100,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  headingWrap: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  profession: {
    color: theme.colors.textDim,
    marginTop: 4,
  },
  contactButton: {
    borderRadius: 12,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    color: theme.colors.textDim,
  },
  sectionCard: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  textMuted: {
    color: theme.colors.textDim,
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.xs,
  },
  tag: {
    backgroundColor: theme.colors.palette.neutral200,
    borderRadius: 999,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  portfolioList: {
    paddingRight: theme.spacing.sm,
  },
  portfolioImage: {
    width: 150,
    height: 110,
    borderRadius: 14,
    marginRight: theme.spacing.sm,
  },
  reviewItem: {
    borderTopColor: theme.colors.separator,
    borderTopWidth: 1,
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  reviewRating: {
    color: theme.colors.tint,
    marginVertical: 4,
  },
}))
