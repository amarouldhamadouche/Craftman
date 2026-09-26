import { ComponentProps } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// Demo Tab Navigator types
export type DemoTabParamList = {
  Home: undefined
  Showroom: NavigatorScreenParams<ShowroomStackParamList> | undefined
  Posts: NavigatorScreenParams<PostsStackParamList> | undefined
  Account: undefined
}

export type ShowroomStackParamList = {
  ShowroomList: undefined
  CraftsmanDetail: { craftsmanId: string }
}

export type PostsStackParamList = {
  PostsList: undefined
  PostDetail: { postId: string }
}

// App Stack Navigator types
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type ShowroomStackScreenProps<T extends keyof ShowroomStackParamList> = NativeStackScreenProps<
  ShowroomStackParamList,
  T
>

export type PostsStackScreenProps<T extends keyof PostsStackParamList> = NativeStackScreenProps<
  PostsStackParamList,
  T
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}
