import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "tailwind-rn";
import BackButton from "./BackButton";

const Page: React.FC<{ title: string; footer?: React.ReactNode }> = ({
  children,
  title,
  footer,
}) => {
  return (
    <SafeAreaView style={tailwind(`bg-yellow-400 flex-1`)}>
      <View style={tailwind("pt-1")}>
        <View
          style={tailwind(`flex-row justify-center items-center relative m-5`)}
        >
          <Text
            style={[
              tailwind(
                `flex-1 text-center text-2xl font-bold absolute left-0 right-0 top-0 bottom-0`
              ),
              { lineHeight: 30 },
            ]}
          >
            {title}
          </Text>
          <BackButton />
          <View style={tailwind(`flex-1`)} />
        </View>
      </View>
      <ScrollView
        style={tailwind(`flex-1 bg-white rounded-t-3xl pt-4 pb-2 px-7`)}
      >
        {children}
      </ScrollView>
      {footer}
    </SafeAreaView>
  );
};

export default Page;
