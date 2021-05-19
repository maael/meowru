import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/AntDesign";
import Constants from 'expo-constants';
import tailwind, { getColor } from 'tailwind-rn';
import Page from '../primitives/Page';
import { Keys, StoreContext } from '../hooks/useAsyncStorage';

export default function User () {
  const {setStore} = useContext(StoreContext)!;
  return (
    <Page title='User Settings'>
      <>
        <View style={tailwind(`px-2 py-3 flex-row justify-center items-center`)}>
          <Text style={tailwind(`text-lg text-black flex-1`)}>App Version</Text>
          <Text style={tailwind(`text-lg`)}>v{Constants.manifest.version || '?.?.?'}</Text>
        </View>
        <View style={tailwind(`px-2 py-3 flex-row justify-center items-center`)}>
          <Text style={tailwind(`text-lg text-black flex-1`)}>Expo Version</Text>
          <Text style={tailwind(`text-lg`)}>v{Constants.expoVersion || '?.?.?'}</Text>
        </View>
        <View style={tailwind(`px-2 py-3 flex-row justify-center items-center`)}>
          <Text style={tailwind(`text-lg text-black flex-1`)}>SDK Version</Text>
          <Text style={tailwind(`text-lg`)}>v{Constants.manifest.sdkVersion || '?.?.?'}</Text>
        </View>
        <View style={tailwind(`w-full border-2 border-gray-300 my-5`)} />
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.removeItem(Keys.Store)
          setStore([]);
        }}>
          <View style={tailwind(`px-2 p-3 flex-row items-center`)}>
            <Icon name='warning' size={30} color={getColor(`red-600`)} />
            <Text style={tailwind(`ml-3 text-base text-red-600`)}>Clear all data</Text>
          </View>
        </TouchableOpacity>
      </>
    </Page>
  )
}
