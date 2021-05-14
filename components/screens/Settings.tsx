import React from 'react';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import BackButton from '../primitives/BackButton';

export default function Settings () {
  return (
    <View style={tailwind('flex-1 pt-10 bg-yellow-400')}>
      <BackButton />
      <Text>Settings</Text>
    </View>
  )
}
