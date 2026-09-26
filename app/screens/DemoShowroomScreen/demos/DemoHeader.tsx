/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import { TextStyle, View } from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

import { Header } from "@/components/Header"
import { Icon } from "@/components/Icon"
import { $styles } from "@/theme/styles"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "./types"
import { DemoUseCase } from "../DemoUseCase"

const $rightAlignTitle: TextStyle = {
  textAlign: "right",
}

function CustomLeftActionHeader() {
  const { theme } = useUnistyles()

  return (
    <Header
      titleTx="demoHeader:useCase.customActionComponents.customLeftActionTitle"
      titleMode="flex"
      titleStyle={$rightAlignTitle}
      LeftActionComponent={
        <View style={[$styles.row, styles.customLeftAction]}>
          {Array.from({ length: 20 }, (x, i) => i).map((i) => (
            <Icon key={i} icon="airplane" color={theme.colors.palette.neutral100} size={20} />
          ))}
        </View>
      }
      safeAreaEdges={[]}
    />
  )
}

function StyledHeaderExamples() {
  const { theme } = useUnistyles()

  return (
    <>
      <Header
        titleTx="demoHeader:useCase.styling.styledTitle"
        titleStyle={styles.customTitle}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader:useCase.styling.styledWrapperTitle"
        titleStyle={styles.customWhiteTitle}
        backgroundColor={theme.colors.error}
        style={{ height: 35 }}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader:useCase.styling.tintedIconsTitle"
        titleStyle={styles.customWhiteTitle}
        backgroundColor={theme.colors.error}
        leftIcon="airplane"
        leftIconColor={theme.colors.palette.neutral100}
        safeAreaEdges={[]}
      />
    </>
  )
}

export const DemoHeader: Demo = {
  name: "Header",
  description: "demoHeader:description",
  data: () => [
    <DemoUseCase
      name="demoHeader:useCase.actionIcons.name"
      description="demoHeader:useCase.actionIcons.description"
    >
      <Header
        titleTx="demoHeader:useCase.actionIcons.leftIconTitle"
        leftIcon="airplane"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader:useCase.actionIcons.rightIconTitle"
        rightIcon="airplane"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader:useCase.actionIcons.bothIconsTitle"
        leftIcon="airplane"
        rightIcon="airplane"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader:useCase.actionText.name"
      description="demoHeader:useCase.actionText.description"
    >
      <Header
        titleTx="demoHeader:useCase.actionText.leftTxTitle"
        leftTx="demoShowroomScreen:demoHeaderTxExample"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader:useCase.actionText.rightTextTitle"
        rightText="Yay"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader:useCase.customActionComponents.name"
      description="demoHeader:useCase.customActionComponents.description"
    >
      <CustomLeftActionHeader />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader:useCase.titleModes.name"
      description="demoHeader:useCase.titleModes.description"
    >
      <Header
        titleTx="demoHeader:useCase.titleModes.centeredTitle"
        leftIcon="airplane"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader:useCase.titleModes.flexTitle"
        titleMode="flex"
        leftIcon="airplane"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader:useCase.styling.name"
      description="demoHeader:useCase.styling.description"
    >
      <StyledHeaderExamples />
    </DemoUseCase>,
  ],
}

const styles = StyleSheet.create((theme) => ({
  customLeftAction: {
    backgroundColor: theme.colors.error,
    flexGrow: 0,
    flexBasis: 100,
    height: "100%",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  customTitle: {
    textDecorationLine: "underline line-through",
    textDecorationStyle: "dashed",
    color: theme.colors.error,
    textDecorationColor: theme.colors.error,
  },
  customWhiteTitle: {
    color: theme.colors.palette.neutral100,
  },
}))
