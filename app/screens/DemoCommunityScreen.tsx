import { FC } from "react"
import { Image, ImageStyle, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import { $styles } from "@/theme/styles"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

const chainReactLogo = require("@assets/images/demo/cr-logo.png")
const reactNativeLiveLogo = require("@assets/images/demo/rnl-logo.png")
const reactNativeNewsletterLogo = require("@assets/images/demo/rnn-logo.png")
const reactNativeRadioLogo = require("@assets/images/demo/rnr-logo.png")

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="demoCommunityScreen:title" style={styles.title} />
        <Text tx="demoCommunityScreen:tagLine" style={styles.tagline} />

        <Text preset="subheading" tx="demoCommunityScreen:joinUsOnSlackTitle" />
        <Text tx="demoCommunityScreen:joinUsOnSlack" style={styles.description} />
        <ListItem
          tx="demoCommunityScreen:joinSlackLink"
          leftIcon="slack"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://community.infinite.red/")}
        />
        <Text
          preset="subheading"
          tx="demoCommunityScreen:makeIgniteEvenBetterTitle"
          style={styles.sectionTitle}
        />
        <Text tx="demoCommunityScreen:makeIgniteEvenBetter" style={styles.description} />
        <ListItem
          tx="demoCommunityScreen:contributeToIgniteLink"
          leftIcon="github"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
        />

        <Text
          preset="subheading"
          tx="demoCommunityScreen:theLatestInReactNativeTitle"
          style={styles.sectionTitle}
        />
        <Text tx="demoCommunityScreen:theLatestInReactNative" style={styles.description} />
        <ListItem
          tx="demoCommunityScreen:reactNativeRadioLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, styles.logoContainer]}>
              <Image source={reactNativeRadioLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
        />
        <ListItem
          tx="demoCommunityScreen:reactNativeNewsletterLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, styles.logoContainer]}>
              <Image source={reactNativeNewsletterLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
        />
        <ListItem
          tx="demoCommunityScreen:reactNativeLiveLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, styles.logoContainer]}>
              <Image source={reactNativeLiveLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://rn.live/")}
        />
        <ListItem
          tx="demoCommunityScreen:chainReactConferenceLink"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, styles.logoContainer]}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
        />
        <Text
          preset="subheading"
          tx="demoCommunityScreen:hireUsTitle"
          style={styles.sectionTitle}
        />
        <Text tx="demoCommunityScreen:hireUs" style={styles.description} />
        <ListItem
          tx="demoCommunityScreen:hireUsLink"
          leftIcon="clap"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://infinite.red/contact")}
        />
      </Screen>
    )
  }

const styles = StyleSheet.create((theme) => ({
  title: {
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    marginBottom: theme.spacing.xxl,
  },
  description: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    marginTop: theme.spacing.xxl,
  },
  logoContainer: {
    marginEnd: theme.spacing.md,
    flexWrap: "wrap",
    alignContent: "center",
    alignSelf: "stretch",
  },
}))
