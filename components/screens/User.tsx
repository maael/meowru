import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {useNav, Screen} from '../hooks/useNav';
import BackButton from '../primitives/BackButton';

export default function User () {
  const nav = useNav();
  return (
    <View style={tailwind('flex-1 pt-10 bg-yellow-400')}>
      <BackButton />
      <Text>User</Text>
      <TouchableOpacity onPress={() => nav.navigate(Screen.Settings)}><Text>Settings</Text></TouchableOpacity>
    </View>
  )
}
