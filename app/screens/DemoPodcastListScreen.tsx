import { ComponentType, FC, useCallback, useMemo, useState } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Platform,
  View,
  TextStyle,
} from "react-native"
import { LegendList } from "@legendapp/list/react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { Button, type ButtonAccessoryProps } from "@/components/Button"
import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { useEpisode } from "@/hooks/useEpisode"
import { usePodcastsQuery } from "@/hooks/usePodcastsQuery"
import { isRTL } from "@/i18n"
import { translate } from "@/i18n/translate"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import type { EpisodeItem } from "@/services/api/types"
import { usePodcastStore } from "@/store/podcast.store"
import { $styles } from "@/theme/styles"
import { delay } from "@/utils/delay"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

const ICON_SIZE = 14

const rnrImage1 = require("@assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("@assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("@assets/images/demo/rnr-image-3.png")

const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = (_props) => {
  const { data: episodes = [], isLoading, refetch } = usePodcastsQuery()
  const favorites = usePodcastStore((state) => state.favorites)
  const favoritesOnly = usePodcastStore((state) => state.favoritesOnly)
  const toggleFavoritesOnly = usePodcastStore((state) => state.toggleFavoritesOnly)
  const toggleFavorite = usePodcastStore((state) => state.toggleFavorite)

  const [refreshing, setRefreshing] = useState(false)

  const episodesForList = useMemo(() => {
    return favoritesOnly
      ? episodes.filter((episode) => favorites.includes(episode.guid))
      : episodes
  }, [episodes, favorites, favoritesOnly])

  const totalEpisodes = episodes.length
  const totalFavorites = favorites.length

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.allSettled([refetch(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
      <LegendList<EpisodeItem>
        contentContainerStyle={[$styles.container, styles.listContentContainer]}
        data={episodesForList}
        extraData={totalEpisodes + totalFavorites}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        recycleItems={true}
        maintainVisibleContentPosition
        keyExtractor={(item) => item.guid}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={styles.emptyState}
              headingTx={
                favoritesOnly ? "demoPodcastListScreen:noFavoritesEmptyState.heading" : undefined
              }
              contentTx={
                favoritesOnly ? "demoPodcastListScreen:noFavoritesEmptyState.content" : undefined
              }
              button={favoritesOnly ? "" : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={styles.heading}>
            <Text preset="heading" tx="demoPodcastListScreen:title" />
            {(favoritesOnly || episodesForList.length > 0) && (
              <View style={styles.toggle}>
                <Switch
                  value={favoritesOnly}
                  onValueChange={() => toggleFavoritesOnly()}
                  labelTx="demoPodcastListScreen:onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  accessibilityLabel={translate("demoPodcastListScreen:accessibility.switch")}
                />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <EpisodeCard episode={item} onPressFavorite={() => toggleFavorite(item)} />
        )}
      />
    </Screen>
  )
}

const EpisodeCard = ({
  episode,
  onPressFavorite,
}:{
  episode: EpisodeItem
  onPressFavorite: () => void
}) => {
  const { theme } = useUnistyles()
  const { isFavorite, datePublished, duration, parsedTitleAndSubtitle } = useEpisode(episode)

  const liked = useSharedValue(isFavorite ? 1 : 0)
  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }
  })

  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }
  })

  const handlePressFavorite = useCallback(() => {
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }, [liked, onPressFavorite])

  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: episode.title,
          accessibilityHint: translate("demoPodcastListScreen:accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: episode.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen:accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [episode.title, handlePressFavorite, isFavorite],
  )

  const handlePressCard = () => {
    openLinkInBrowser(episode.enclosure.link)
  }

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            <Animated.View
              style={[
                $styles.row,
                styles.iconContainer,
                StyleSheet.absoluteFill,
                animatedLikeButtonStyles,
              ]}
            >
              <Icon icon="airplane" size={ICON_SIZE} color={theme.colors.palette.neutral800} />
            </Animated.View>
            <Animated.View style={[$styles.row, styles.iconContainer, animatedUnlikeButtonStyles]}>
              <Icon icon="airplane" size={ICON_SIZE} color={theme.colors.palette.primary400} />
            </Animated.View>
          </View>
        )
      },
    [animatedLikeButtonStyles, animatedUnlikeButtonStyles, theme.colors],
  )

  return (
    <Card
      style={styles.item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={[$styles.row, styles.metadata]}>
          <Text
            style={styles.metadataText}
            size="xxs"
            accessibilityLabel={datePublished.accessibilityLabel}
          >
            {datePublished.textLabel}
          </Text>
          <Text
            style={styles.metadataText}
            size="xxs"
            accessibilityLabel={duration.accessibilityLabel}
          >
            {duration.textLabel}
          </Text>
        </View>
      }
      content={
        parsedTitleAndSubtitle.subtitle
          ? `${parsedTitleAndSubtitle.title} - ${parsedTitleAndSubtitle.subtitle}`
          : parsedTitleAndSubtitle.title
      }
      {...accessibilityHintProps}
      RightComponent={<Image source={imageUri} style={styles.itemThumbnail} />}
      FooterComponent={
        <Button
          onPress={handlePressFavorite}
          onLongPress={handlePressFavorite}
          style={[styles.favoriteButton, isFavorite && styles.unFavoriteButton]}
          accessibilityLabel={
            isFavorite
              ? translate("demoPodcastListScreen:accessibility.unfavoriteIcon")
              : translate("demoPodcastListScreen:accessibility.favoriteIcon")
          }
          LeftAccessory={ButtonLeftAccessory}
        >
          <Text
            size="xxs"
            accessibilityLabel={duration.accessibilityLabel}
            weight="medium"
            text={
              isFavorite
                ? translate("demoPodcastListScreen:unfavoriteButton")
                : translate("demoPodcastListScreen:favoriteButton")
            }
          />
        </Button>
      }
    />
  )
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $emptyStateImage = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const styles = StyleSheet.create((theme) => ({
  listContentContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg + theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  heading: {
    marginBottom: theme.spacing.md,
  },
  item: {
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    minHeight: 120,
    backgroundColor: theme.colors.palette.neutral100,
  },
  itemThumbnail: {
    marginTop: theme.spacing.sm,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  toggle: {
    marginTop: theme.spacing.md,
  },
  iconContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginEnd: theme.spacing.sm,
  },
  metadata: {
    color: theme.colors.textDim,
    marginTop: theme.spacing.xs,
  },
  metadataText: {
    color: theme.colors.textDim,
    marginEnd: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  favoriteButton: {
    borderRadius: 17,
    marginTop: theme.spacing.md,
    justifyContent: "flex-start",
    backgroundColor: theme.colors.palette.neutral300,
    borderColor: theme.colors.palette.neutral300,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xxxs,
    paddingBottom: 0,
    minHeight: 32,
    alignSelf: "flex-start",
  },
  unFavoriteButton: {
    borderColor: theme.colors.palette.primary100,
    backgroundColor: theme.colors.palette.primary100,
  },
  emptyState: {
    marginTop: theme.spacing.xxl,
  },
}))
