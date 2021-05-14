import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"

export enum Screen {
  Main = 'Main',
  NewEntry = 'NewEntry',
  ExistingEntry = 'ExistingEntry',
  User = 'User',
  Settings = 'Settings',
}

export type StackParamsList = {
  [Screen.Main]: undefined,
  [Screen.NewEntry]: undefined,
  [Screen.ExistingEntry]: {entryId: number},
  [Screen.User]: undefined,
  [Screen.Settings]: undefined,
}

export type NavStackParams = StackNavigationProp<StackParamsList>;

export type RouteParams <T extends Screen> = RouteProp<StackParamsList, T>;
