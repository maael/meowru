import {useNavigation, useRoute as useRnRoute} from '@react-navigation/native';
import { NavStackParams, Screen, RouteParams } from '../../types';

export {Screen};

export function useRoute <S extends Screen> () {
  return useRnRoute<RouteParams<S>>();
}

export function useNav () {
  return useNavigation<NavStackParams>();
}
