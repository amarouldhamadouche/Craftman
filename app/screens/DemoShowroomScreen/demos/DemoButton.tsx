/* eslint-disable react/jsx-key */
import { ImageStyle, View, ViewStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "./types"
import { DemoUseCase } from "../DemoUseCase"

const $iconStyle: ImageStyle = { width: 30, height: 30 }
const $disabledOpacity: ViewStyle = { opacity: 0.5 }

export const DemoButton: Demo = {
  name: "Button",
  description: "demoButton:description",
  data: () => [
    <DemoUseCase
      name="demoButton:useCase.presets.name"
      description="demoButton:useCase.presets.description"
    >
      <Button>Default - Laboris In Labore</Button>
      <DemoDivider />

      <Button preset="filled">Filled - Laboris Ex</Button>
      <DemoDivider />

      <Button preset="reversed">Reversed - Ad Ipsum</Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.passingContent.name"
      description="demoButton:useCase.passingContent.description"
    >
      <Button text={translate("demoButton:useCase.passingContent.viaTextProps")} />
      <DemoDivider />

      <Button tx="demoShowroomScreen:demoViaTxProp" />
      <DemoDivider />

      <Button>{translate("demoButton:useCase.passingContent.children")}</Button>
      <DemoDivider />

      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton:useCase.passingContent.rightAccessory")}
      </Button>
      <DemoDivider />

      <Button
        preset="filled"
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton:useCase.passingContent.leftAccessory")}
      </Button>
      <DemoDivider />

      <Button>
        <Text>
          <Text preset="bold">{translate("demoButton:useCase.passingContent.nestedChildren")}</Text>
          {` `}
          <Text preset="default">
            {translate("demoButton:useCase.passingContent.nestedChildren2")}
          </Text>
          {` `}
          <Text preset="bold">
            {translate("demoButton:useCase.passingContent.nestedChildren3")}
          </Text>
        </Text>
      </Button>
      <DemoDivider />

      <Button
        preset="reversed"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton:useCase.passingContent.multiLine")}
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.styling.name"
      description="demoButton:useCase.styling.description"
    >
      <Button style={styles.customButtonStyle}>
        {translate("demoButton:useCase.styling.styleContainer")}
      </Button>
      <DemoDivider />

      <Button preset="filled" textStyle={styles.customButtonTextStyle}>
        {translate("demoButton:useCase.styling.styleText")}
      </Button>
      <DemoDivider />

      <Button
        preset="reversed"
        RightAccessory={() => <View style={styles.customButtonRightAccessoryStyle} />}
      >
        {translate("demoButton:useCase.styling.styleAccessories")}
      </Button>
      <DemoDivider />

      <Button
        pressedStyle={styles.customButtonPressedStyle}
        pressedTextStyle={styles.customButtonPressedTextStyle}
        RightAccessory={(props) => (
          <Icon
            containerStyle={props.style}
            style={[
              $iconStyle,
              props.pressableState.pressed && styles.customButtonPressedRightAccessoryStyle,
            ]}
            icon="ladybug"
          />
        )}
      >
        {translate("demoButton:useCase.styling.pressedState")}
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.disabling.name"
      description="demoButton:useCase.disabling.description"
    >
      <Button
        disabled
        disabledStyle={$disabledOpacity}
        pressedStyle={styles.customButtonPressedStyle}
        pressedTextStyle={styles.customButtonPressedTextStyle}
      >
        {translate("demoButton:useCase.disabling.standard")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledStyle={$disabledOpacity}
        pressedStyle={styles.customButtonPressedStyle}
        pressedTextStyle={styles.customButtonPressedTextStyle}
      >
        {translate("demoButton:useCase.disabling.filled")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="reversed"
        disabledStyle={$disabledOpacity}
        pressedStyle={styles.customButtonPressedStyle}
        pressedTextStyle={styles.customButtonPressedTextStyle}
      >
        {translate("demoButton:useCase.disabling.reversed")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        pressedStyle={styles.customButtonPressedStyle}
        pressedTextStyle={styles.customButtonPressedTextStyle}
        RightAccessory={(props) => (
          <View
            style={
              props.disabled
                ? [styles.customButtonRightAccessoryStyle, $disabledOpacity]
                : styles.customButtonRightAccessoryStyle
            }
          />
        )}
      >
        {translate("demoButton:useCase.disabling.accessory")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledTextStyle={[styles.customButtonTextStyle, styles.disabledButtonTextStyle]}
        pressedStyle={styles.customButtonPressedStyle}
        pressedTextStyle={styles.customButtonPressedTextStyle}
      >
        {translate("demoButton:useCase.disabling.textStyle")}
      </Button>
    </DemoUseCase>,
  ],
}

const styles = StyleSheet.create((theme) => ({
  customButtonStyle: {
    backgroundColor: theme.colors.error,
    height: 100,
  },
  customButtonPressedStyle: {
    backgroundColor: theme.colors.error,
  },
  customButtonTextStyle: {
    color: theme.colors.error,
    fontFamily: theme.typography.primary.bold,
    textDecorationLine: "underline",
    textDecorationColor: theme.colors.error,
  },
  customButtonPressedTextStyle: {
    color: theme.colors.palette.neutral100,
  },
  customButtonRightAccessoryStyle: {
    width: "53%",
    height: "200%",
    backgroundColor: theme.colors.error,
    position: "absolute",
    top: 0,
    right: 0,
  },
  customButtonPressedRightAccessoryStyle: {
    tintColor: theme.colors.palette.neutral100,
  },
  disabledButtonTextStyle: {
    color: theme.colors.palette.neutral100,
    textDecorationColor: theme.colors.palette.neutral100,
  },
}))
