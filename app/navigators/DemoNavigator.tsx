import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StyleSheet } from "react-native-unistyles"

import { Icon } from "@/components/Icon"
import { AccountScreen } from "@/screens/AccountScreen"
import { CraftsmanDetailScreen } from "@/screens/CraftsmanDetailScreen"
import { HomeScreen } from "@/screens/HomeScreen"
import { PostDetailScreen } from "@/screens/PostDetailScreen"
import { PostsScreen } from "@/screens/PostsScreen"
import { ShowroomScreen } from "@/screens/ShowroomScreen"
import { useThemeStore } from "@/store/theme.store"

import type { DemoTabParamList, PostsStackParamList, ShowroomStackParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<DemoTabParamList>()
const ShowroomStack = createNativeStackNavigator<ShowroomStackParamList>()
const PostsStack = createNativeStackNavigator<PostsStackParamList>()

function ShowroomStackNavigator() {
  return (
    <ShowroomStack.Navigator screenOptions={{ headerShown: false }}>
      <ShowroomStack.Screen name="ShowroomList" component={ShowroomScreen} />
      <ShowroomStack.Screen name="CraftsmanDetail" component={CraftsmanDetailScreen} />
    </ShowroomStack.Navigator>
  )
}

function PostsStackNavigator() {
  return (
    <PostsStack.Navigator screenOptions={{ headerShown: false }}>
      <PostsStack.Screen name="PostsList" component={PostsScreen} />
      <PostsStack.Screen name="PostDetail" component={PostDetailScreen} />
    </PostsStack.Navigator>
  )
}

/**
 * This is the main navigator for the Craftsman marketplace screens with a bottom tab bar.
 */
export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()
  const colors = useThemeStore((state) => state.theme.colors)

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? colors.tint : colors.tintInactive} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Showroom"
        component={ShowroomStackNavigator}
        options={{
          tabBarLabel: "Showroom",
          tabBarIcon: ({ focused }) => (
            <Icon icon="grid" color={focused ? colors.tint : colors.tintInactive} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Posts"
        component={PostsStackNavigator}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ focused }) => (
            <Icon icon="document" color={focused ? colors.tint : colors.tintInactive} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused }) => (
            <Icon icon="user" color={focused ? colors.tint : colors.tintInactive} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create((theme) => ({
  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopColor: theme.colors.transparent,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  tabBarItem: {
    paddingTop: theme.spacing.sm,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: theme.typography.primary.medium,
    lineHeight: 16,
  },
}))
