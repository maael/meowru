import React from 'react';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {useRoute, Screen} from '../hooks/useNav';
import BackButton from '../primitives/BackButton';

export default function EntryView () {
  const route = useRoute<Screen.ExistingEntry>();
  return (
    <View style={tailwind('flex-1 pt-10 bg-yellow-400')}>
      <BackButton />
      <Text>{route.params.entryId} Entry</Text>
    </View>
  )
}
