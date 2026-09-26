import { FC, useState } from "react"
import { Image, Pressable, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { posts } from "@/data/craftsmanData"
import type { PostsStackScreenProps } from "@/navigators/navigationTypes"

export const PostDetailScreen: FC<PostsStackScreenProps<"PostDetail">> = function PostDetailScreen({
  route,
  navigation,
}) {
  const [responded, setResponded] = useState(false)
  const post = posts.find((item) => item.id === route.params.postId)

  if (!post) {
    return (
      <Screen preset="fixed" contentContainerStyle={styles.emptyState}>
        <Text preset="bold">Request not found</Text>
        <Button text="Go back" onPress={() => navigation.goBack()} style={styles.respondButton} />
      </Screen>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton} accessibilityRole="button">
        <Icon icon="arrow-right" size={16} color="#111827" />
      </Pressable>

      <View style={styles.customerRow}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.customerDetails}>
          <Text preset="bold" size="sm">
            {post.user.name}
          </Text>
          <Text size="xs" style={styles.mutedText}>
            {post.location} · {post.createdAt}
          </Text>
        </View>
      </View>

      <View style={styles.categoryChip}>
        <Text size="xs" style={styles.categoryText}>{post.category}</Text>
      </View>

      <Text preset="bold" size="lg" style={styles.requestTitle}>
        Service request
      </Text>
      <Text size="sm" style={styles.description}>
        {post.content}
      </Text>

      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Icon icon="map-pin" size={18} color="#6B7280" />
          <View>
            <Text size="xxs" style={styles.mutedText}>Location</Text>
            <Text size="sm">{post.location}</Text>
          </View>
        </View>
        {post.budget ? (
          <View style={styles.detailRow}>
            <Icon icon="document" size={18} color="#6B7280" />
            <View>
              <Text size="xxs" style={styles.mutedText}>Budget</Text>
              <Text size="sm">{post.budget}</Text>
            </View>
          </View>
        ) : null}
      </View>

      {post.image ? <Image source={{ uri: post.image }} style={styles.requestImage} /> : null}

      <Button
        text={responded ? "Response sent" : "Respond to request"}
        preset="filled"
        style={styles.respondButton}
        onPress={() => setResponded(true)}
      />
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.palette.neutral100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: theme.spacing.md,
  },
  customerDetails: {
    flex: 1,
  },
  mutedText: {
    color: theme.colors.textDim,
  },
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.palette.neutral200,
    borderRadius: 999,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  categoryText: {
    color: theme.colors.text,
  },
  requestTitle: {
    marginBottom: theme.spacing.sm,
  },
  description: {
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  detailsSection: {
    gap: theme.spacing.md,
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 14,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  requestImage: {
    width: "100%",
    aspectRatio: 1.5,
    borderRadius: 14,
    marginBottom: theme.spacing.md,
  },
  respondButton: {
    marginTop: theme.spacing.sm,
    borderRadius: 12,
  },
}))