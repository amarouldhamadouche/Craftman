import {
  Image,
  ImageStyle,
  Pressable,
  PressableProps,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"
import { useUnistyles } from "react-native-unistyles"

export type IconTypes = keyof typeof iconRegistry

import AirplaneSvg from "@assets/icons/airplane.svg"
import { ComponentType, useEffect, useState } from "react"
import { Svg, SvgProps, Path, Rect, Circle, Line, G } from "react-native-svg"
import { EaseView } from "react-native-ease"

type BaseIconProps = {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
type PressableIconProps = Omit<PressableProps, "style"> & BaseIconProps
type IconProps = Omit<ViewProps, "style"> & BaseIconProps

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 */
export function PressableIcon(props: PressableIconProps & { scale?: number }) {
  const {
    icon,
    color,
    size = 24,
    style: $styleOverride,
    containerStyle: $containerStyleOverride,
    scale = 0.87,
    ...pressableProps
  } = props

  const { theme } = useUnistyles()
  const SvgIcon: ComponentType<SvgProps> = iconRegistry[icon]
  const [pressed, setPressed] = useState<Boolean>(false)

  if (!SvgIcon) return null

  return (
    <EaseView
      animate={{
        scale: pressed ? scale || 0.77 : 1,
      }}
      transition={{
        type: "spring",
        damping: 16,
      }}
    >
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        {...pressableProps}
        style={$containerStyleOverride}
      >
        <SvgIcon
          width={size}
          height={size}
          fill={color ?? theme.colors.text}
          style={$styleOverride}
        />
      </Pressable>
    </EaseView>
  )
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 24,
    style: $styleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const { theme } = useUnistyles()
  const SvgIcon: ComponentType<SvgProps> = iconRegistry[icon]

  if (!SvgIcon) return null

  return (
    <EaseView
      animate={
        {
          // scale: pressed ? scale || 0.97 : 1,
        }
      }
      transition={{
        type: "spring",
        damping: 16,
      }}
    >
      <View {...viewProps} style={$containerStyleOverride}>
        <SvgIcon
          width={size}
          height={size}
          fill={color ?? theme.colors.text}
          style={$styleOverride}
        />
      </View>
    </EaseView>
  )
}

const HouseIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9.5Z" fill={props.fill ?? "currentColor"} />
  </Svg>
)

const GridIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Rect x="3" y="3" width="7" height="7" rx="1.5" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Rect x="14" y="3" width="7" height="4.5" rx="1.5" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Rect x="14" y="12" width="7" height="9" rx="1.5" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Rect x="3" y="14" width="7" height="7" rx="1.5" fill={props.fill ?? "currentColor"} opacity={0.9} />
  </Svg>
)

const DocumentIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M7 3.5h6l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Path d="M13 3.5v5h5" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8.5 13h7M8.5 16h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
)

const UserIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Circle cx="12" cy="8" r="4" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Path d="M4 19c1.5-3 4.2-4.5 8-4.5S18.5 16 20 19" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="2" strokeLinecap="round" />
  </Svg>
)

const BellIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 4a4 4 0 0 1 4 4v3.5c0 .9.3 1.8.9 2.5L18 15H6l1.1-1c.6-.7.9-1.6.9-2.5V8a4 4 0 0 1 4-4Z" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Path d="M10 18.5a2 2 0 0 0 4 0" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
)

const SearchIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Circle cx="11" cy="11" r="5" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="2" />
    <Path d="M16 16l4 4" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="2" strokeLinecap="round" />
  </Svg>
)

const StarIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="m12 2.6 2.9 5.8 6.4.9-4.6 4.5 1.1 6.3L12 0.4l-5.8 3.7 1.1-6.3L2.7 9.3l6.4-.9L12 2.6Z" fill={props.fill ?? "currentColor"} />
  </Svg>
)

const MapPinIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.8" />
    <Circle cx="12" cy="10" r="2.4" fill={props.fill ?? "currentColor"} />
  </Svg>
)

const ArrowRightIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

const HeartIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 20.5c-.3 0-.6-.1-.9-.3C5 15.7 2 12.8 2 9a4.5 4.5 0 0 1 7.7-3.1L12 6.2l2.3-2.3A4.5 4.5 0 1 1 22 9c0 3.8-3 6.7-9.1 11.2-.3.2-.6.3-.9.3Z" fill={props.fill ?? "currentColor"} />
  </Svg>
)

const ChatIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M6 18.5V6.5A2 2 0 0 1 8 4.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 4v-6.5Z" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.8" strokeLinejoin="round" />
  </Svg>
)

const ShareIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Circle cx="18" cy="5" r="2.5" fill={props.fill ?? "currentColor"} />
    <Circle cx="6" cy="12" r="2.5" fill={props.fill ?? "currentColor"} />
    <Circle cx="18" cy="19" r="2.5" fill={props.fill ?? "currentColor"} />
    <Path d="M8.2 11.2 15.8 6.8M8.2 12.8 15.8 17.2" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
)

const SparklesIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 2.5 13.7 7l4.5 1.7-4.5 1.7L12 15.5l-1.7-4.5-4.5-1.7 4.5-1.7L12 2.5Zm7 11.5 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5ZM4 14l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1L4 14Z" fill={props.fill ?? "currentColor"} />
  </Svg>
)

const BoltIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M13 2 5 13h4l-1 9 8-11h-4l1-9Z" fill={props.fill ?? "currentColor"} />
  </Svg>
)

const HammerIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M5 8.5V5.7A2.7 2.7 0 0 1 7.7 3h9.6c1.4 0 2.7 1.1 2.7 2.5v1.3c0 1.6-1.3 2.9-2.9 2.9h-4.7L9.4 14H7.5l-2.5-5.5Z" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Path d="M7 14.5h3.5L9.8 18a2 2 0 0 1-3.5-1.6l.7-1.9Z" fill={props.fill ?? "currentColor"} opacity={0.9} />
  </Svg>
)

const PaintIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M5 5.5h10a2 2 0 0 1 2 2V9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" fill={props.fill ?? "currentColor"} opacity={0.9} />
    <Path d="M7 11h7v5.5A2.5 2.5 0 0 1 11.5 19h-1A2.5 2.5 0 0 1 8 16.5V11Z" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.7" strokeLinejoin="round" />
  </Svg>
)

const WrenchIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M14.7 6.8a4.5 4.5 0 0 1-6.4 6.3L5 16.2l1.8 1.8 3.3-3.3a4.5 4.5 0 0 1 6.3-6.4l-1.7-1.7 1.7-1.7-1.4-1.4-1.7 1.7Z" fill={props.fill ?? "currentColor"} opacity={0.9} />
  </Svg>
)

const BriefcaseIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M4 8.5A2 2 0 0 1 6 6.5h12a2 2 0 0 1 2 2v8A2 2 0 0 1 18 18.5H6a2 2 0 0 1-2-2v-8Z" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.8" />
    <Path d="M8 6.5V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8v.7M4 11.5h16" fill="none" stroke={props.fill ?? "currentColor"} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
)

export const iconRegistry = {
  airplane: AirplaneSvg,
  home: HouseIcon,
  grid: GridIcon,
  document: DocumentIcon,
  user: UserIcon,
  bell: BellIcon,
  search: SearchIcon,
  star: StarIcon,
  "map-pin": MapPinIcon,
  "arrow-right": ArrowRightIcon,
  heart: HeartIcon,
  chat: ChatIcon,
  share: ShareIcon,
  sparkles: SparklesIcon,
  bolt: BoltIcon,
  hammer: HammerIcon,
  paint: PaintIcon,
  wrench: WrenchIcon,
  briefcase: BriefcaseIcon,
} as const

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
