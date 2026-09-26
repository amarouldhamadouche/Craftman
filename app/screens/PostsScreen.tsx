import { FC, useState } from "react"
import { FlatList, Image, Pressable, ScrollView, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { posts as initialPosts, type Post } from "@/data/craftsmanData"
import type { PostsStackScreenProps } from "@/navigators/navigationTypes"

const filters = ["All", "Electricity", "Plumbing", "Carpentry", "Painting"]

export const PostsScreen: FC<PostsStackScreenProps<"PostsList">> = function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter((post) => post.category === selectedCategory)

  const toggleLike = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post

        const liked = !post.liked
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : Math.max(post.likes - 1, 0),
        }
      }),
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(post) => post.id}
        contentContainerStyle={styles.feedList}
        ListHeaderComponent={
          <View>
            <Text preset="heading" size="lg" style={styles.title}>
              Posts
            </Text>
            <Text size="sm" style={styles.subtitle}>
              Find people who need your skills
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
              {filters.map((filter) => {
                const active = selectedCategory === filter
                return (
                  <Pressable
                    key={filter}
                    onPress={() => setSelectedCategory(filter)}
                    style={[styles.filterChip, active && styles.activeFilterChip]}
                  >
                    <Text size="xs" style={[styles.filterText, active && styles.activeFilterText]}>
                      {filter}
                    </Text>
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item: post }) => (
          <View style={styles.postCard}>
            <Pressable onPress={() => navigation.navigate("PostDetail", { postId: post.id })}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
                <View style={styles.userDetails}>
                  <Text preset="bold" size="xs" numberOfLines={1}>
                    {post.user.name}
                  </Text>
                  <Text size="xxs" style={styles.metaText}>
                    {post.location} · {post.createdAt}
                  </Text>
                </View>
                <View style={styles.categoryChip}>
                  <Text size="xxs" style={styles.categoryText} numberOfLines={1}>
                    {post.category}
                  </Text>
                </View>
              </View>

              <Text size="sm" style={styles.postText}>
                {post.content}
              </Text>

              <View style={styles.requestMeta}>
                <View style={styles.metaItem}>
                  <Icon icon="map-pin" size={14} color="#6B7280" />
                  <Text size="xxs" style={styles.metaText}>{post.location}</Text>
                </View>
                {post.budget ? <Text size="xxs" style={styles.budget}>{post.budget}</Text> : null}
              </View>

              {post.image ? <Image source={{ uri: post.image }} style={styles.postImage} /> : null}
            </Pressable>

            <View style={styles.actionRow}>
              <Pressable
                onPress={() => navigation.navigate("PostDetail", { postId: post.id })}
                style={styles.responseButton}
              >
                <Icon icon="chat" size={16} color="#6B7280" />
                <Text size="xxs" style={styles.actionText}>{post.responses} responses</Text>
              </Pressable>
              <Pressable onPress={() => toggleLike(post.id)} style={styles.likeButton}>
                <Icon icon="heart" size={16} color={post.liked ? "#ef4444" : "#6B7280"} />
                <Text size="xxs" style={[styles.actionText, post.liked && styles.likedText]}>
                  {post.likes}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  screenContent: {
    flex: 1,
  },
  title: {
    marginTop: theme.spacing.md,
  },
  subtitle: {
    color: theme.colors.textDim,
    marginBottom: theme.spacing.sm,
  },
  filterList: {
    paddingBottom: theme.spacing.md,
  },
  filterChip: {
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 999,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  activeFilterChip: {
    backgroundColor: theme.colors.tint,
  },
  filterText: {
    color: theme.colors.textDim,
  },
  activeFilterText: {
    color: theme.colors.palette.neutral100,
  },
  feedList: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
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
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  userDetails: {
    flex: 1,
    minWidth: 0,
  },
  metaText: {
    color: theme.colors.textDim,
  },
  categoryChip: {
    maxWidth: "42%",
    backgroundColor: theme.colors.palette.neutral200,
    borderRadius: 999,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  categoryText: {
    color: theme.colors.text,
  },
  postText: {
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  requestMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  budget: {
    color: theme.colors.tint,
    textAlign: "right",
    flexShrink: 1,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.separator,
    paddingTop: theme.spacing.sm,
  },
  responseButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    gap: 6,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.xs,
    gap: 6,
  },
  actionText: {
    color: theme.colors.textDim,
  },
  likedText: {
    color: "#ef4444",
  },
}))
