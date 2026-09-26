/* eslint-disable react/jsx-key */
import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { Icon } from "@/components/Icon"
import { ListItem } from "@/components/ListItem"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { $styles } from "@/theme/styles"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "./types"
import { DemoUseCase } from "../DemoUseCase"

const listData =
  `Tempor Id Ea Aliqua Pariatur Aliquip. Irure Minim Voluptate Consectetur Consequat Sint Esse Proident Irure. Nostrud Elit Veniam Nostrud Excepteur Minim Deserunt Quis Dolore Velit Nulla Irure Voluptate Tempor. Occaecat Amet Laboris Nostrud Qui Do Quis Lorem Ex Elit Fugiat Deserunt. In Pariatur Excepteur Exercitation Ex Incididunt Qui Mollit Dolor Sit Non. Culpa Officia Minim Cillum Exercitation Voluptate Proident Laboris Et Est Reprehenderit Quis Pariatur Nisi`
    .split(".")
    .map((item) => item.trim())

function CustomLeftIcons() {
  const { theme } = useUnistyles()

  return (
    <View style={[$styles.row, styles.customLeft, { marginEnd: theme.spacing.md }]}>
      {Array.from({ length: 9 }, (x, i) => i).map((i) => (
        <Icon key={i} icon="ladybug" color={theme.colors.palette.neutral100} size={20} />
      ))}
    </View>
  )
}

function CustomRightIcons() {
  const { theme } = useUnistyles()

  return (
    <View style={[$styles.row, styles.customLeft, { marginStart: theme.spacing.md }]}>
      {Array.from({ length: 9 }, (x, i) => i).map((i) => (
        <Icon key={i} icon="ladybug" color={theme.colors.palette.neutral100} size={20} />
      ))}
    </View>
  )
}

function StyledListItemExamples() {
  const { theme } = useUnistyles()

  return (
    <>
      <ListItem topSeparator textStyle={styles.customTextStyle}>
        {translate("demoListItem:useCase.styling.styledText")}
      </ListItem>

      <ListItem
        topSeparator
        textStyle={{ color: theme.colors.palette.neutral100 }}
        style={styles.customTouchableStyle}
      >
        {translate("demoListItem:useCase.styling.styledText")}
      </ListItem>

      <ListItem
        topSeparator
        textStyle={{ color: theme.colors.palette.neutral100 }}
        style={styles.customTouchableStyle}
        containerStyle={styles.customContainerStyle}
      >
        {translate("demoListItem:useCase.styling.styledContainer")}
      </ListItem>
      <ListItem
        topSeparator
        textStyle={{ color: theme.colors.palette.neutral100 }}
        style={styles.customTouchableStyle}
        containerStyle={styles.customContainerStyle}
        rightIcon="ladybug"
        leftIcon="ladybug"
        rightIconColor={theme.colors.palette.neutral100}
        leftIconColor={theme.colors.palette.neutral100}
      >
        {translate("demoListItem:useCase.styling.tintedIcons")}
      </ListItem>
    </>
  )
}

export const DemoListItem: Demo = {
  name: "ListItem",
  description: "demoListItem:description",
  data: () => [
    <DemoUseCase
      name="demoListItem:useCase.height.name"
      description="demoListItem:useCase.height.description"
    >
      <ListItem topSeparator>{translate("demoListItem:useCase.height.defaultHeight")}</ListItem>

      <ListItem topSeparator height={100}>
        {translate("demoListItem:useCase.height.customHeight")}
      </ListItem>

      <ListItem topSeparator>{translate("demoListItem:useCase.height.textHeight")}</ListItem>

      <ListItem topSeparator bottomSeparator TextProps={{ numberOfLines: 1 }}>
        {translate("demoListItem:useCase.height.longText")}
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="demoListItem:useCase.separators.name"
      description="demoListItem:useCase.separators.description"
    >
      <ListItem topSeparator>{translate("demoListItem:useCase.separators.topSeparator")}</ListItem>

      <DemoDivider size={40} />

      <ListItem topSeparator bottomSeparator>
        {translate("demoListItem:useCase.separators.topAndBottomSeparator")}
      </ListItem>

      <DemoDivider size={40} />

      <ListItem bottomSeparator>
        {translate("demoListItem:useCase.separators.bottomSeparator")}
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="demoListItem:useCase.icons.name"
      description="demoListItem:useCase.icons.description"
    >
      <ListItem topSeparator leftIcon="ladybug">
        {translate("demoListItem:useCase.icons.leftIcon")}
      </ListItem>

      <ListItem topSeparator rightIcon="ladybug">
        {translate("demoListItem:useCase.icons.rightIcon")}
      </ListItem>

      <ListItem topSeparator bottomSeparator rightIcon="ladybug" leftIcon="ladybug">
        {translate("demoListItem:useCase.icons.leftRightIcons")}
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="demoListItem:useCase.customLeftRight.name"
      description="demoListItem:useCase.customLeftRight.description"
    >
      <ListItem topSeparator LeftComponent={<CustomLeftIcons />}>
        {translate("demoListItem:useCase.customLeftRight.customLeft")}
      </ListItem>

      <ListItem topSeparator bottomSeparator RightComponent={<CustomRightIcons />}>
        {translate("demoListItem:useCase.customLeftRight.customRight")}
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="demoListItem:useCase.passingContent.name"
      description="demoListItem:useCase.passingContent.description"
    >
      <ListItem topSeparator text={translate("demoListItem:useCase.passingContent.children")} />
      <ListItem topSeparator tx="demoShowroomScreen:demoViaTxProp" />
      <ListItem topSeparator>{translate("demoListItem:useCase.passingContent.children")}</ListItem>
      <ListItem topSeparator bottomSeparator>
        <Text>
          <Text preset="bold">
            {translate("demoListItem:useCase.passingContent.nestedChildren1")}
          </Text>
          {` `}
          <Text preset="default">
            {translate("demoListItem:useCase.passingContent.nestedChildren2")}
          </Text>
        </Text>
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="demoListItem:useCase.listIntegration.name"
      description="demoListItem:useCase.listIntegration.description"
    >
      <View style={styles.listStyle}>
        <FlatList<string>
          data={listData}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => (
            <ListItem
              text={item}
              rightIcon="caretRight"
              TextProps={{ numberOfLines: 1 }}
              topSeparator={index !== 0}
            />
          )}
        />
      </View>
    </DemoUseCase>,

    <DemoUseCase
      name="demoListItem:useCase.styling.name"
      description="demoListItem:useCase.styling.description"
    >
      <StyledListItemExamples />
    </DemoUseCase>,
  ],
}

const styles = StyleSheet.create((theme) => ({
  customLeft: {
    backgroundColor: theme.colors.error,
    flexGrow: 0,
    flexBasis: 60,
    height: "100%",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  customTextStyle: {
    color: theme.colors.error,
  },
  customTouchableStyle: {
    backgroundColor: theme.colors.error,
  },
  customContainerStyle: {
    borderTopWidth: 5,
    borderTopColor: theme.colors.palette.neutral100,
  },
  listStyle: {
    height: 148,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.palette.neutral200,
  },
}))
