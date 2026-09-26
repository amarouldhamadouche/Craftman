import { FC, useMemo, useState } from "react"
import { Image, Pressable, ScrollView, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Icon, iconRegistry } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { categories, craftsmen, posts } from "@/data/craftsmanData"
import type { DemoTabScreenProps } from "@/navigators/navigationTypes"

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("")

  const filteredCraftsmen = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return craftsmen.slice(0, 5)

    return craftsmen.filter(
      (craftsman) =>
        craftsman.name.toLowerCase().includes(normalized) ||
        craftsman.profession.toLowerCase().includes(normalized) ||
        craftsman.categories.some((category) => category.toLowerCase().includes(normalized)),
    )
  }, [query])

  const recentPosts = posts.slice(0, 2)

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <View style={styles.headerRow}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            }}
            style={styles.avatar}
          />
          <View style={styles.greetingWrap}>
            <Text preset="formLabel" style={styles.greetingLabel}>
              Good evening, Amar 👋
            </Text>
            <Text size="xs" style={styles.subtitle}>
              Find the right craftsman for your job.
            </Text>
          </View>
        </View>

        <Pressable style={styles.notificationButton} accessibilityRole="button">
          <Icon icon="bell" size={18} color="#111827" />
        </Pressable>
      </View>

      <TextField
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a service or craftsman"
        containerStyle={styles.searchWrapper}
        inputWrapperStyle={styles.searchInput}
        LeftAccessory={({ style }) => (
          <View style={style}>
            <Icon icon="search" size={18} color="#6B7280" />
          </View>
        )}
      />

      <View style={styles.sectionHeader}>
        <Text preset="bold" size="sm">
          Categories
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
        {categories.slice(1).map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Icon icon={category.icon as keyof typeof iconRegistry} size={18} color="#1F2937" />
            </View>
            <Text size="xxs" style={styles.categoryLabel}>
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text preset="bold" size="sm">
          Recommended craftsmen
        </Text>
        <Pressable onPress={() => navigation.navigate("Showroom")}>
          <Text size="xs" style={styles.linkText}>
            View all
          </Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredList}>
        {filteredCraftsmen.map((craftsman) => (
          <Pressable
            key={craftsman.id}
            onPress={() => navigation.navigate("Showroom", { screen: "CraftsmanDetail", params: { craftsmanId: craftsman.id } })}
            style={styles.featuredCard}
          >
            <Image source={{ uri: craftsman.avatar }} style={styles.featuredAvatar} />
            <Text preset="bold" size="xs" style={styles.featuredName}>
              {craftsman.name}
            </Text>
            <Text size="xxs" style={styles.featuredProfession}>
              {craftsman.profession}
            </Text>
            <View style={styles.ratingRow}>
              <Text size="xxs">⭐ {craftsman.rating}</Text>
              <Text size="xxs" style={styles.mutedText}>
                {craftsman.completedJobs} jobs
              </Text>
            </View>
            <Text size="xxs" style={styles.featuredLocation}>
              {craftsman.location}
            </Text>
            <View style={styles.viewRow}>
              <Text size="xxs" style={styles.viewText}>
                View
              </Text>
              <Icon icon="arrow-right" size={12} color="#1F2937" />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text preset="bold" size="sm">
          Recent requests
        </Text>
        <Pressable onPress={() => navigation.navigate("Posts")}>
          <Text size="xs" style={styles.linkText}>
            See all
          </Text>
        </Pressable>
      </View>

      <View style={styles.postList}>
        {recentPosts.map((post) => (
          <Pressable
            key={post.id}
            style={styles.postCard}
            onPress={() => navigation.navigate("Posts", { screen: "PostDetail", params: { postId: post.id } })}
          >
            <Text preset="bold" size="xs" numberOfLines={2} style={styles.postContent}>
              {post.content}
            </Text>
            <View style={styles.postMeta}>
              <Text size="xxs" style={styles.mutedText}>
                {post.location} · {post.category} · {post.createdAt}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Button
        text="Browse more"
        preset="filled"
        style={styles.browseButton}
        onPress={() => navigation.navigate("Showroom")}
      />
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  screenContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.sm,
  },
  greetingWrap: {
    flex: 1,
  },
  greetingLabel: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
  subtitle: {
    color: theme.colors.textDim,
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: theme.colors.palette.neutral100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchWrapper: {
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 16,
    borderWidth: 0,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  linkText: {
    color: theme.colors.tint,
  },
  categoryList: {
    paddingVertical: theme.spacing.xs,
  },
  categoryItem: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    minWidth: 82,
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 18,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: theme.colors.palette.neutral200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xs,
  },
  categoryLabel: {
    color: theme.colors.text,
    textAlign: "center",
  },
  featuredList: {
    paddingBottom: theme.spacing.md,
  },
  featuredCard: {
    width: 180,
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  featuredAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginBottom: theme.spacing.sm,
  },
  featuredName: {
    marginBottom: 2,
  },
  featuredProfession: {
    color: theme.colors.textDim,
    marginBottom: theme.spacing.xs,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  mutedText: {
    color: theme.colors.textDim,
  },
  featuredLocation: {
    color: theme.colors.textDim,
    marginBottom: theme.spacing.sm,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewText: {
    marginRight: theme.spacing.xs,
    color: theme.colors.text,
  },
  postList: {
    gap: theme.spacing.md,
  },
  postCard: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 14,
    padding: theme.spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  postContent: {
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  postMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  browseButton: {
    marginTop: theme.spacing.lg,
    borderRadius: 16,
  },
}))
