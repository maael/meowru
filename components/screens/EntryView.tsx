import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import format from 'date-fns/format';
import BackButton from '../primitives/BackButton';
import { StoreContext } from '../hooks/useAsyncStorage';
import {useRoute, Screen} from '../hooks/useNav';
import {getRatingColor, getStyleColors} from '../util';
import tinycolor from 'tinycolor2';

export default function EntryView () {
  const route = useRoute<Screen.ExistingEntry>();
  const {store} = React.useContext(StoreContext)!;
  const item = store.find(({id}) => route.params.entryId && id === route.params.entryId);
  console.info(item);
  let component = null;
  if (!item) {
    component = (
      <View style={tailwind(`flex justify-center items-center flex-1`)}>
        <Text style={tailwind(`text-lg`)}>
          Couldn't find that entry.
        </Text>
        <Text style={tailwind(`text-lg`)}>
          Sorry about that.
        </Text>
      </View>
    )
  } else {
    const ratingColourBg = getRatingColor(item.rating, 'bg', 'hex');
    const ratingColour = tinycolor(ratingColourBg).isLight() ? '#000000' : '#FFFFFF';
    component = (
      <ScrollView
        style={tailwind(`flex-1 bg-white rounded-t-3xl pt-4 pb-2 px-7`)}
      >
        <View style={tailwind(`flex-row pb-3`)}>
          <Text style={tailwind(`flex-1 text-lg font-bold`)}>
            {format(new Date(item.createdAt), "dd MMM yyyy")}
          </Text>
          <Text style={tailwind(`text-lg font-bold`)}>
            {format(new Date(item.createdAt), "HH:mm")}
          </Text>
        </View>
        <View style={tailwind(`items-center justify-center my-5`)}>
          <View style={[tailwind(`flex-row p-5 rounded-full`), {backgroundColor: ratingColourBg, color: ratingColour}]}>
            <Text style={tailwind(`text-3xl`)}>{item.rating}</Text>
          </View>
        </View>
        <View style={tailwind(`flex-row items-center justify-center mb-2`)}>
          <View style={[tailwind(`h-2 w-2 mx-2 rounded-full`), getStyleColors(item.symptom)]} />
          <Text style={tailwind(`text-2xl text-center`)}>{item.symptom}</Text>
        </View>
        <Text style={tailwind(`text-lg font-bold mt-3 mb-1`)}>Groupings</Text>
        <View style={tailwind(`flex-row`)}>
          {item.groupings.map((g) => <Text key={g} style={[tailwind(`text-base m-1 px-2 rounded-md`), getStyleColors(g)]}>{g}</Text>)}
        </View>
        <Text style={tailwind(`text-lg font-bold mt-3`)}>Causes</Text>
        <Text style={tailwind(`text-lg`)}>{item.causes}</Text>
        <Text style={tailwind(`text-lg font-bold mt-3`)}>Other Notes</Text>
        <Text style={tailwind(`text-lg`)}>{item.notes}</Text>
      </ScrollView>
    )
  }
  return (
    <View style={tailwind('flex-1 pt-10 bg-yellow-400')}>
      <View style={tailwind(`pb-3`)}>
        <BackButton />
      </View>
      {component}
    </View>
  )
}
