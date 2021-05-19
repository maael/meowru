import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import tailwind, { getColor } from "tailwind-rn";
import Icon from "react-native-vector-icons/AntDesign";
import EIcon from "react-native-vector-icons/EvilIcons";
import { LineChart } from "react-native-chart-kit";
import format from 'date-fns/format';
import compareDesc from 'date-fns/compareDesc';
import { useNav, Screen } from "../hooks/useNav";
import { StoreContext, StoreItem } from "../hooks/useAsyncStorage";
import {colorFromString, getStyleColors} from '../util';

const chartConfig: LineChart['props']['chartConfig'] = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  propsForLabels: {fontSize: 16},
  propsForVerticalLabels: {fontSize: 12},
  propsForHorizontalLabels: {fontSize: 12},
};

const screenWidth = Dimensions.get("window").width;

function dateDescSort (key: string) {
  return (a: any, b: any) => compareDesc(new Date(a[key]), new Date(b[key]))
}

export default function MainScreen () {
  const nav = useNav();
  const {store} = React.useContext(StoreContext)!;
  const sectionedData = Object.entries(store.reduce((acc, item) => {
    const title = format(new Date(item.createdAt), "dd MMM yyyy");
    return {...acc, [title]: (acc[title] || []).concat(item)}
  }, {} as any)).map(([k, v]) => ({title: k, data: (v as StoreItem[]).sort(dateDescSort('createdAt'))})).sort(dateDescSort('title'));
  const labels = sectionedData.map(({title}) => title).reverse();
  const legend = [...(new Set(sectionedData.map(({data: d}) => d.map((i) => i.symptom)).reduce((acc, ar) => acc.concat(ar), [])))];
  const datasets = legend.map((l) => ({
    data: sectionedData.map(({data}) => data.map(({symptom, rating}) => symptom === l ? rating : 0).reduce((sum, i) => (sum || 0) + (i || 0), 0)).reverse(),
    color: (opacity = 1) => colorFromString(l, opacity).toRgbString(),
    strokeWidth: 3,
  }))
  const chartData: LineChart['props']['data'] = {
    labels,
    datasets,
    legend
  }
  return (
    <SafeAreaView style={tailwind(`flex-1 bg-yellow-400`)}>
      <View style={tailwind(`flex-1`)}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        fromZero
        bezier
        withVerticalLines={false}
      />
      <TouchableOpacity style={tailwind(`absolute right-1 top-2`)} onPress={() => nav.navigate(Screen.User)}>
        <EIcon name='user' size={60} color='#000000' />
      </TouchableOpacity>
      <View style={tailwind("flex-1")}>
        <View style={tailwind(`flex-1 bg-white rounded-t-3xl overflow-hidden`)}>
          {sectionedData.length > 0 ? (<SectionList
            keyExtractor={(item, index) => `${item.id}${index}`}
            stickySectionHeadersEnabled
            sections={sectionedData}
            renderSectionHeader={({ section }) => (
              <Text style={tailwind(`font-bold px-5 pt-5 bg-white pb-2`)}>
                {section.title}
              </Text>
            )}
            renderItem={({ item }) => (
              <View style={tailwind("flex-row px-5 py-2")}>
                <View style={tailwind(`flex-row`)}>
                  <View
                    style={tailwind(
                      `rounded-full bg-red-200 h-10 w-10 justify-center items-center`
                    )}
                  >
                    <Text>{item.rating}</Text>
                  </View>
                </View>
                <View style={tailwind(`px-2 flex-1`)}>
                  <View style={tailwind(`flex-row items-center`)}>
                    <View style={[tailwind(`h-2 w-2 mx-1 rounded-full`), getStyleColors(item.symptom)]} />
                    <Text>{item.symptom}</Text>
                  </View>
                  <View style={tailwind(`flex-row`)}>
                    {item.groupings.filter(Boolean).map((g) => (
                      <Text key={g} style={[tailwind(`m-1 px-2 rounded-md`), getStyleColors(g)]}>{g}</Text>
                    ))}
                  </View>
                </View>
                <TouchableOpacity onPress={() => nav.navigate(Screen.ExistingEntry, {entryId: item.id})}>
                  <Icon name="arrowright" size={30} color="#000000" />
                </TouchableOpacity>
              </View>
            )}
          />) : (
            <View style={tailwind(`flex-1 justify-center items-center`)}>
              <Icon name='frown' size={40} style={tailwind(`pb-5`)} />
              <Text style={tailwind(`text-center font-bold pb-2`)}>No data!</Text>
              <Text style={tailwind(`text-center font-bold`)}>Tap the + icon above to add items.</Text>
            </View>
          )}
        </View>
        <View
          style={tailwind(
            `bg-yellow-400 rounded-full border-solid border-8 border-yellow-400 absolute -top-10 -right-1`
          )}
        >
          <TouchableOpacity style={tailwind(`py-4 px-4 bg-white rounded-full`)} onPress={() => nav.navigate(Screen.NewEntry)}>
            <Text style={tailwind(`text-center text-xl`)}>
              <Icon name="pluscircleo" size={28} color={getColor("yellow-400")} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
