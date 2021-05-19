import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"

export enum Screen {
  Main = 'Main',
  NewEntry = 'NewEntry',
  ExistingEntry = 'ExistingEntry',
  User = 'User',
}

export type StackParamsList = {
  [Screen.Main]: undefined,
  [Screen.NewEntry]: undefined,
  [Screen.ExistingEntry]: {entryId: string},
  [Screen.User]: undefined,
}

export type NavStackParams = StackNavigationProp<StackParamsList>;

export type RouteParams <T extends Screen> = RouteProp<StackParamsList, T>;
