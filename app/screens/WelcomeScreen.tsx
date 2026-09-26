import { FC } from "react"
import { Image, ImageStyle, View } from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAuthStore } from "@/store/auth.store"
import { $styles } from "@/theme/styles"
import { useHeader } from "@/utils/useHeader"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen(_props) {
  const { theme } = useUnistyles()
  const { navigation } = _props
  const logout = useAuthStore((state) => state.logout)

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={styles.topContainer}>
        <Image style={styles.welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={styles.welcomeHeading}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image
          style={$welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.neutral900}
        />
      </View>

      <View style={[styles.bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen:postscript" size="md" />

        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen:letsGo"
          onPress={goNext}
        />
      </View>
    </Screen>
  )
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const styles = StyleSheet.create((theme) => ({
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "57%",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  bottomContainer: {
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: "43%",
    backgroundColor: theme.colors.palette.neutral100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: "space-around",
  },
  welcomeLogo: {
    height: 88,
    width: "100%",
    marginBottom: theme.spacing.xxl,
  },
  welcomeHeading: {
    marginBottom: theme.spacing.md,
  },
}))
