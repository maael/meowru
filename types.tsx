import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"

export enum Screen {
  Main = 'Main',
  NewEntry = 'NewEntry',
  ExistingEntry = 'ExistingEntry',
}

export type StackParamsList = {
  [Screen.Main]: undefined,
  [Screen.NewEntry]: undefined,
  [Screen.ExistingEntry]: {entryId: number},
}

export type NavStackParams = StackNavigationProp<StackParamsList>;

export type RouteParams <T extends Screen> = RouteProp<StackParamsList, T>;
