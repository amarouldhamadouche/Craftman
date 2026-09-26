/* eslint-disable react/jsx-key */
import { View } from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { Icon, iconRegistry, type IconTypes } from "@/components/Icon"
import { Text } from "@/components/Text"
import { $styles } from "@/theme/styles"

import { Demo } from "./types"
import { DemoUseCase } from "../DemoUseCase"

function IconGallery() {
  const { theme } = useUnistyles()

  return (
    <>
      {Object.keys(iconRegistry).map((icon) => (
        <View key={icon} style={styles.iconTile}>
          <Icon icon={icon as IconTypes} color={theme.colors.tint} size={35} />

          <Text size="xs" style={styles.iconTileLabel}>
            {icon}
          </Text>
        </View>
      ))}
    </>
  )
}

function IconColorRow() {
  const { theme } = useUnistyles()

  return (
    <>
      <Icon
        icon="ladybug"
        color={theme.colors.palette.accent500}
        containerStyle={styles.demoIconContainer}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.primary500}
        containerStyle={styles.demoIconContainer}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.secondary500}
        containerStyle={styles.demoIconContainer}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.neutral700}
        containerStyle={styles.demoIconContainer}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.angry500}
        containerStyle={styles.demoIconContainer}
      />
    </>
  )
}

export const DemoIcon: Demo = {
  name: "Icon",
  description: "demoIcon:description",
  data: () => [
    <DemoUseCase
      name="demoIcon:useCase.icons.name"
      description="demoIcon:useCase.icons.description"
      layout="row"
      itemStyle={$styles.flexWrap}
    >
      <IconGallery />
    </DemoUseCase>,

    <DemoUseCase
      name="demoIcon:useCase.size.name"
      description="demoIcon:useCase.size.description"
      layout="row"
    >
      <Icon icon="ladybug" containerStyle={styles.demoIconContainer} />
      <Icon icon="ladybug" size={35} containerStyle={styles.demoIconContainer} />
      <Icon icon="ladybug" size={50} containerStyle={styles.demoIconContainer} />
      <Icon icon="ladybug" size={75} containerStyle={styles.demoIconContainer} />
    </DemoUseCase>,

    <DemoUseCase
      name="demoIcon:useCase.color.name"
      description="demoIcon:useCase.color.description"
      layout="row"
    >
      <IconColorRow />
    </DemoUseCase>,

    <DemoUseCase
      name="demoIcon:useCase.styling.name"
      description="demoIcon:useCase.styling.description"
      layout="row"
    >
      <Icon
        icon="ladybug"
        style={styles.customIcon}
        size={40}
        containerStyle={styles.customIconContainer}
      />
    </DemoUseCase>,
  ],
}

const styles = StyleSheet.create((theme) => ({
  demoIconContainer: {
    padding: theme.spacing.xs,
  },
  iconTile: {
    width: "33.333%",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
  },
  iconTileLabel: {
    marginTop: theme.spacing.xxs,
    color: theme.colors.textDim,
  },
  customIconContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.palette.angry500,
  },
  customIcon: {
    tintColor: theme.colors.palette.neutral100,
  },
}))
