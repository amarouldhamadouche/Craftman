import { FC, ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { FlatList, Image, ImageStyle, Platform, SectionList, View } from "react-native"
import { Link, RouteProp, useRoute } from "@react-navigation/native"
import { Drawer } from "react-native-drawer-layout"
import { StyleSheet } from "react-native-unistyles"

import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TxKeyPath, isRTL } from "@/i18n"
import { translate } from "@/i18n/translate"
import { DemoTabParamList, DemoTabScreenProps } from "@/navigators/navigationTypes"
import { $styles } from "@/theme/styles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"
import SectionListWithKeyboardAwareScrollView from "./SectionListWithKeyboardAwareScrollView"
import { Header } from "@/components/Header"
import { Icon } from "@/components/Icon"
import { Button } from "@/components/Button"

const logo = require("@assets/images/logo.png")

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

/**
 * Type-safe utility to check if an unknown object has a valid string property.
 * This is particularly useful in React 19 where props are typed as unknown by default.
 * The function safely narrows down the type by checking both property existence and type.
 * @param props - The unknown props to check.
 * @param propName - The name of the property to check.
 * @returns Whether the property is a valid string.
 */
function hasValidStringProp(props: unknown, propName: string): boolean {
  return (
    props !== null &&
    typeof props === "object" &&
    propName in props &&
    typeof (props as Record<string, unknown>)[propName] === "string"
  )
}

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  return (
    <View>
      <Link
        screen="DemoShowroom"
        params={{ queryIndex: item.name.toLowerCase() }}
        style={styles.menuContainer}
      >
        <Text preset="bold">{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link
            key={`section${sectionIndex}-${u}`}
            screen="DemoShowroom"
            params={{ queryIndex: item.name.toLowerCase(), itemIndex: itemSlug }}
          >
            <Text>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => {
  return (
    <View>
      <Text onPress={() => handleScroll?.(sectionIndex)} preset="bold" style={styles.menuContainer}>
        {item.name}
      </Text>
      {item.useCases.map((u, index) => (
        <ListItem
          key={`section${sectionIndex}-${u}`}
          onPress={() => handleScroll?.(sectionIndex, index)}
          text={u}
          rightIcon={isRTL ? "airplane" : "airplane"}
        />
      ))}
    </View>
  )
}

const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })
const isAndroid = Platform.OS === "android"

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    const [open, setOpen] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>(null)
    const listRef = useRef<SectionList>(null)
    const menuRef = useRef<FlatList<DemoListItem["item"]>>(null)
    const route = useRoute<RouteProp<DemoTabParamList, "DemoShowroom">>()
    const params = route.params

    const toggleDrawer = useCallback(() => {
      if (!open) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }, [open])

    const handleScroll = useCallback((sectionIndex: number, itemIndex = 0) => {
      try {
        listRef.current?.scrollToLocation({
          animated: true,
          itemIndex,
          sectionIndex,
          viewPosition: 0.25,
        })
      } catch (e) {
        console.error(e)
      }
    }, [])

    useEffect(() => {
      if (params !== undefined && Object.keys(params).length > 0) {
        const demoValues = Object.values(Demos)
        const findSectionIndex = demoValues.findIndex(
          (x) => x.name.toLowerCase() === params.queryIndex,
        )
        let findItemIndex = 0
        if (params.itemIndex) {
          try {
            findItemIndex = demoValues[findSectionIndex].data().findIndex((u) => {
              if (hasValidStringProp(u.props, "name")) {
                return (
                  slugify(translate((u.props as { name: TxKeyPath }).name)) === params.itemIndex
                )
              }
              return false
            })
          } catch (err) {
            console.error(err)
          }
        }
        handleScroll(findSectionIndex, findItemIndex)
      }
    }, [handleScroll, params])

    const scrollToIndexFailed = (info: {
      index: number
      highestMeasuredFrameIndex: number
      averageItemLength: number
    }) => {
      listRef.current?.getScrollResponder()?.scrollToEnd()
      timeout.current = setTimeout(
        () =>
          listRef.current?.scrollToLocation({
            animated: true,
            itemIndex: info.index,
            sectionIndex: 0,
          }),
        50,
      )
    }

    useEffect(() => {
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }
      }
    }, [])

    const $drawerInsets = useSafeAreaInsetsStyle(["top"])

    return (
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerType="back"
        drawerPosition={isRTL ? "right" : "left"}
        renderDrawerContent={() => (
          <View style={[styles.drawer, $drawerInsets]}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={$logoImage} />
            </View>
            <FlatList<DemoListItem["item"]>
              ref={menuRef}
              contentContainerStyle={styles.listContentContainer}
              data={Object.values(Demos).map((d) => ({
                name: d.name,
                useCases: d.data().map((u) => {
                  if (hasValidStringProp(u.props, "name")) {
                    return translate((u.props as { name: TxKeyPath }).name)
                  }
                  return ""
                }),
              }))}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index: sectionIndex }) => (
                <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
              )}
            />
          </View>
        )}
      >
        <Screen
          preset="fixed"
          safeAreaEdges={["top"]}
          contentContainerStyle={$styles.flex1}
          {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
        >
          <DrawerIconButton onPress={toggleDrawer} />

          <Header title="home" LeftActionComponent={<Button scale={0.88} style={{borderWidth: 0, backgroundColor: "transparent"}}  > <Icon icon="airplane" /> </Button>} />

          <SectionListWithKeyboardAwareScrollView
            ref={listRef}
            contentContainerStyle={styles.sectionListContentContainer}
            stickySectionHeadersEnabled={false}
            sections={Object.values(Demos).map((d) => ({
              name: d.name,
              description: d.description,
              data: [d.data()],
            }))}
            renderItem={({ item, index: sectionIndex }) => (
              <View>
                {item.map((demo: ReactElement, demoIndex: number) => (
                  <View key={`${sectionIndex}-${demoIndex}`}>{demo}</View>
                ))}
              </View>
            )}
            renderSectionFooter={() => <View style={styles.demoUseCasesSpacer} />}
            ListHeaderComponent={
              <View style={styles.heading}>
                <Text preset="heading" tx="demoShowroomScreen:jumpStart" />
              </View>
            }
            onScrollToIndexFailed={scrollToIndexFailed}
            renderSectionHeader={({ section }) => {
              return (
                <View>
                  <Text preset="heading" style={styles.demoItemName}>
                    {section.name}
                  </Text>
                  <Text style={styles.demoItemDescription}>{translate(section.description)}</Text>
                </View>
              )
            }}
          />
        </Screen>
      </Drawer>
    )
  }

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const styles = StyleSheet.create((theme) => ({
  drawer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  sectionListContentContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  heading: {
    marginBottom: theme.spacing.xxxl,
  },
  logoContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    height: 56,
    paddingHorizontal: theme.spacing.lg,
  },
  menuContainer: {
    paddingBottom: theme.spacing.xs,
    paddingTop: theme.spacing.lg,
  },
  demoItemName: {
    fontSize: 24,
    marginBottom: theme.spacing.md,
  },
  demoItemDescription: {
    marginBottom: theme.spacing.xxl,
  },
  demoUseCasesSpacer: {
    paddingBottom: theme.spacing.xxl,
  },
}))
