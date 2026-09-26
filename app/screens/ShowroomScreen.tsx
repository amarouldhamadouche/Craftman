import { FC, useMemo, useState } from "react"
import { FlatList, Image, Pressable, ScrollView, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { craftsmen } from "@/data/craftsmanData"
import type { ShowroomStackScreenProps } from "@/navigators/navigationTypes"

const filters = ["All", "Electricians", "Plumbers", "Carpenters", "Painters", "Mechanics", "Builders"]

export const ShowroomScreen: FC<ShowroomStackScreenProps<"ShowroomList">> = function ShowroomScreen({
  navigation,
}) {
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filteredCraftsmen = useMemo(() => {
    if (selectedFilter === "All") return craftsmen

    const normalized = selectedFilter.toLowerCase().replace(/s$/, "")
    return craftsmen.filter((craftsman) =>
      craftsman.profession.toLowerCase().includes(normalized) ||
      craftsman.categories.some((category) => category.toLowerCase().includes(normalized)),
    )
  }, [selectedFilter])

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <FlatList
        data={filteredCraftsmen}
        numColumns={2}
        keyExtractor={(craftsman) => craftsman.id}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text preset="heading" size="lg" style={styles.title}>
              Showroom
            </Text>
            <Text size="sm" style={styles.subtitle}>
              Discover skilled craftsmen near you
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
              {filters.map((filter) => {
                const active = selectedFilter === filter
                return (
                  <Pressable
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
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
        renderItem={({ item: craftsman }) => (
          <Pressable
            onPress={() => navigation.navigate("CraftsmanDetail", { craftsmanId: craftsman.id })}
            style={styles.card}
          >
            <Image source={{ uri: craftsman.coverImage }} style={styles.coverImage} />
            <View style={styles.cardBody}>
              <Text preset="bold" size="xs" numberOfLines={1}>
                {craftsman.name}
              </Text>
              <Text size="xxs" style={styles.profession} numberOfLines={1}>
                {craftsman.profession}
              </Text>
              <View style={styles.metaRow}>
                <Text size="xxs">⭐ {craftsman.rating}</Text>
                <Text size="xxs" style={styles.locationText} numberOfLines={1}>
                  {craftsman.location}
                </Text>
              </View>
              <Text size="xxs" style={styles.price} numberOfLines={1}>
                From {craftsman.startingPrice.toLocaleString("fr-DZ")} DA
              </Text>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  screenContent: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
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
  gridRow: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  coverImage: {
    width: "100%",
    aspectRatio: 1.35,
  },
  cardBody: {
    padding: theme.spacing.sm,
  },
  profession: {
    color: theme.colors.textDim,
    marginBottom: theme.spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    color: theme.colors.textDim,
  },
  price: {
    color: theme.colors.tint,
  },
}))
