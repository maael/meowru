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
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/AntDesign";
import EIcon from "react-native-vector-icons/EvilIcons";
import { LineChart } from "react-native-chart-kit";
import {Screen, NavStackParams} from '../types';

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

const data: LineChart['props']['data'] = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [40, 25, 18, 80, 99, 43],
      color: (opacity = 1) => `rgba(250, 65, 244, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [3, 2, 1, 0, 10, 30],
      color: (opacity = 1) => `rgba(250, 250, 244, ${opacity})`,
      strokeWidth: 3,
    },
  ],
  legend: ["CFS", "OCD", "Test"],
};

const screenWidth = Dimensions.get("window").width;

export default function MainScreen () {
  const nav = useNavigation<NavStackParams>();
  return (
    <SafeAreaView style={tailwind(`flex-1 bg-yellow-400`)}>
      <View style={tailwind(`flex-1`)}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        fromZero
        bezier
        withVerticalLines={false}
      />
      <TouchableOpacity style={tailwind(`absolute right-2 top-2`)} onPress={() => nav.navigate(Screen.NewEntry)}>
        <EIcon name='user' size={60} color='#000000' />
      </TouchableOpacity>
      <View style={tailwind("flex-1")}>
        <View style={tailwind(`flex-1 bg-white rounded-t-3xl overflow-hidden`)}>
          <SectionList
            keyExtractor={(item, index) => `${item.id}${index}`}
            stickySectionHeadersEnabled
            sections={[
              {
                data: [
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 1 },
                ],
                title: "02 May 2021",
              },
              {
                data: [
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 2 },
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 3 },
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 4 },
                ],
                title: "01 May 2021",
              },
              {
                data: [
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 2 },
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 3 },
                  { symptom: "Headache", groups: ["CFS"], rating: 6, id: 4 },
                ],
                title: "28 April 2021",
              },
            ]}
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
                  <Text>{item.symptom}</Text>
                  <View>
                    {item.groups.map((g) => (
                      <Text key={g}>{g}</Text>
                    ))}
                  </View>
                </View>
                <TouchableOpacity onPress={() => nav.navigate(Screen.ExistingEntry, {entryId: item.id})}>
                  <Icon name="arrowright" size={30} color="#000000" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View
          style={tailwind(
            `bg-yellow-400 rounded-full border-solid border-8 border-yellow-400 absolute -top-8 right-0`
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
