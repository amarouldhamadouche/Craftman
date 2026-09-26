import { FC, useCallback, useMemo } from "react"
import { LayoutAnimation, Linking, Platform, useColorScheme, View } from "react-native"
import * as Application from "expo-application"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import { useAuthStore } from "@/store/auth.store"
import { useThemeStore } from "@/store/theme.store"
import { $styles } from "@/theme/styles"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const themeContext = useThemeStore((state) => state.themeContext)
  const setThemeContextOverride = useThemeStore((state) => state.setThemeContextOverride)
  const logout = useAuthStore((state) => state.logout)

  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null

  const demoReactotron = useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        })
      }
    },
    [],
  )

  const toggleTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
  }, [themeContext, setThemeContextOverride])

  const colorScheme = useColorScheme()
  const resetTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setThemeContextOverride(undefined)
  }, [setThemeContextOverride])

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.container, styles.container]}
    >
      <Text
        style={styles.reportBugsLink}
        tx="demoDebugScreen:reportBugs"
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
      />

      <Text style={styles.title} preset="heading" tx="demoDebugScreen:title" />
      <Text preset="bold">Current system theme: {colorScheme}</Text>
      <Text preset="bold">Current app theme: {themeContext}</Text>
      <Button onPress={resetTheme} text={`Reset`} />

      <View style={styles.itemsContainer}>
        <Button onPress={toggleTheme} text={`Toggle Theme: ${themeContext}`} />
      </View>
      <View style={styles.itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={styles.item}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={styles.item}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={styles.item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={styles.item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={styles.item}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={styles.item}>
              <Text preset="bold">Fabric Enabled</Text>
              <Text>{String(usingFabric)}</Text>
            </View>
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} tx="demoDebugScreen:reactotron" onPress={demoReactotron} />
        <Text style={styles.hint} tx={`demoDebugScreen:${Platform.OS}ReactotronHint` as const} />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} tx="common:logOut" onPress={logout} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    marginBottom: theme.spacing.xxl,
  },
  reportBugsLink: {
    color: theme.colors.tint,
    marginBottom: theme.spacing.lg,
    alignSelf: isRTL ? "flex-start" : "flex-end",
  },
  item: {
    marginBottom: theme.spacing.md,
  },
  itemsContainer: {
    marginVertical: theme.spacing.xl,
  },
  button: {
    marginBottom: theme.spacing.xs,
  },
  buttonContainer: {
    marginBottom: theme.spacing.md,
  },
  hint: {
    color: theme.colors.palette.neutral600,
    fontSize: 12,
    lineHeight: 15,
    paddingBottom: theme.spacing.lg,
  },
}))
