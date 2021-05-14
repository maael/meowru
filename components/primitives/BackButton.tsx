import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNav } from "../hooks/useNav";

export default function BackButton (props: TouchableOpacityProps) {
  const nav = useNav()
  return (
    <TouchableOpacity {...props} onPress={() => nav.goBack()}>
      <Icon name='arrowleft' size={30} color='#000000' />
    </TouchableOpacity>
  )
}
