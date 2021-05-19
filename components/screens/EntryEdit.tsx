import React, { useEffect, useState, useMemo, createRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import tailwind from "tailwind-rn";
import format from "date-fns/format";
import { v4 as uuid } from "uuid";
import Page from "../primitives/Page";
import useKeyboard from "../hooks/useKeyboard";
import { useNav, Screen } from "../hooks/useNav";
import { StoreContext } from "../hooks/useAsyncStorage";
import { ratingColorsHex as colours, getStyleColors } from "../util";

const max = 10;

function getRatingColour(value: number) {
  return colours[
    Math.min(Math.floor(value / (max / colours.length)), colours.length - 1)
  ];
}

export default function EntryEdit() {
  const { store, setStore } = React.useContext(StoreContext)!;
  const groupSuggestions = [
    ...new Set(
      store.map((i) => i.groupings).reduce((acc, ar) => acc.concat(ar), [])
    ),
  ];
  const symptomSuggestions = [...new Set(store.map((i) => i.symptom))];
  const { isVisible } = useKeyboard();
  const nav = useNav();
  const openDate = useMemo(() => new Date(), []);
  const [symptom, setSymptom] = useState("");
  const [rating, setRating] = useState(max / 2);
  const [groupings, setGroupings] = useState<string[]>([]);
  const [grouping, setGrouping] = useState("");
  const [causes, setCauses] = useState("");
  const [notes, setNotes] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const symptomRef = createRef<TextInput>();
  const groupingRef = createRef<TextInput>();
  const causesRef = createRef<TextInput>();

  useEffect(() => {
    setSuggestions(
      symptomSuggestions.filter((s) =>
        s.toLowerCase().includes(symptom.toLowerCase())
      )
    );
  }, [symptom]);

  useEffect(() => {
    setSuggestions(
      groupSuggestions.filter((g) =>
        g.toLowerCase().includes(grouping.toLowerCase())
      )
    );
  }, [grouping]);

  const fieldMappings = {
    symptom: {
      ref: symptomRef,
      state: symptom,
      setter: setSymptom,
    },
    grouping: {
      ref: groupingRef,
      state: grouping,
      setter: setGrouping,
    },
  };

  const [activeField, setActiveField] =
    useState<keyof typeof fieldMappings | undefined>();

  useEffect(() => setSuggestions([]), [activeField]);

  return (
    <Page
      title="New Entry"
      footer={
        isVisible && suggestions.length > 0 ? (
          <View style={tailwind(`bg-white px-5 py-2 flex-row`)}>
            {suggestions.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => {
                  activeField && fieldMappings[activeField].setter(s);
                  activeField && fieldMappings[activeField].ref.current?.blur();
                }}
              >
                <Text
                  style={[tailwind(`mx-1 text-base px-2 rounded-md`), getStyleColors(s)]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null
      }
    >
      <>
        <View style={tailwind(`flex-row pb-3`)}>
          <Text style={tailwind(`flex-1 text-lg font-bold`)}>
            {format(openDate, "dd MMM yyyy")}
          </Text>
          <Text style={tailwind(`text-lg font-bold`)}>
            {format(openDate, "HH:mm")}
          </Text>
        </View>
        <Text style={tailwind(`font-bold text-lg`)}>Rating</Text>
        <View style={tailwind(`flex-row items-center justify-center`)}>
          <Slider
            value={rating}
            onValueChange={setRating}
            style={{
              flex: 1,
              padding: 0,
              margin: 0,
              height: 50,
              marginBottom: -5,
            }}
            minimumValue={0}
            maximumValue={10}
            step={0.5}
            maximumTrackTintColor={colours[0]}
            minimumTrackTintColor={colours[colours.length - 1]}
            thumbTintColor={getRatingColour(rating)}
          />
          <View style={tailwind(`flex-row items-center justify-center`)}>
            <View
              style={[
                tailwind(
                  `rounded-full w-10 h-10 flex-row items-center justify-center`
                ),
                { backgroundColor: getRatingColour(rating) },
              ]}
            >
              <Text
                style={tailwind(
                  `font-bold text-white text-lg text-center -mt-1`
                )}
              >
                {rating}
              </Text>
            </View>
          </View>
        </View>
        <View style={tailwind(`pb-1`)}>
          <Text style={tailwind(`font-bold text-lg`)}>Symptom</Text>
          <TextInput
            value={symptom}
            onChangeText={setSymptom}
            placeholder="Start typing..."
            returnKeyLabel="Next"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => groupingRef.current?.focus()}
            style={tailwind(`text-lg`)}
            ref={symptomRef}
            onFocus={() => setActiveField("symptom")}
            onBlur={() => setActiveField(undefined)}
          />
        </View>
        <View style={tailwind(`pb-1`)}>
          <Text style={tailwind(`font-bold text-lg`)}>Groupings</Text>
          <TextInput
            value={grouping}
            onChangeText={setGrouping}
            placeholder="Start typing..."
            returnKeyLabel="Next"
            returnKeyType="next"
            blurOnSubmit={false}
            ref={groupingRef}
            onSubmitEditing={() => causesRef.current?.focus()}
            style={tailwind(`text-lg pb-1`)}
            onFocus={() => setActiveField("grouping")}
            onBlur={() => {
              setActiveField(undefined);
              setGroupings((g) => g.concat(grouping));
              setGrouping("");
            }}
          />
          <View style={tailwind(`flex-row flex-wrap`)}>
            {groupings.map((g, i) => (
              <Text
                key={i}
                style={tailwind(`rounded-sm my-1 mx-2 px-2 bg-gray-100`)}
              >
                {g}
              </Text>
            ))}
          </View>
        </View>
        <Text style={tailwind(`font-bold text-lg`)}>Possible Causes</Text>
        <TextInput
          value={causes}
          onChangeText={setCauses}
          placeholder="Start typing..."
          multiline
          numberOfLines={2}
          textAlignVertical="top"
          returnKeyLabel="Next"
          returnKeyType="next"
          blurOnSubmit={false}
          ref={causesRef}
          style={tailwind(`text-lg`)}
        />
        <Text style={tailwind(`font-bold text-lg`)}>Other Notes</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Start typing..."
          multiline
          numberOfLines={2}
          textAlignVertical="top"
          returnKeyLabel="Next"
          returnKeyType="next"
          blurOnSubmit={false}
          style={tailwind(`text-lg`)}
        />
        <TouchableOpacity
          style={tailwind(
            `bg-yellow-400 rounded-lg py-2 px-5 ${
              !symptom ? "bg-opacity-50" : ""
            }`
          )}
          onPress={async () => {
            const newItem = {
              id: uuid(),
              symptom,
              notes,
              causes,
              rating,
              groupings: groupings.map((g) => g.trim()).filter(Boolean),
              createdAt: openDate.toISOString(),
            };
            setStore((s) => s.concat(newItem));
            nav.navigate(Screen.Main);
          }}
          disabled={!symptom}
        >
          <Text style={tailwind(`text-center text-white text-xl font-bold`)}>
            Save Entry
          </Text>
        </TouchableOpacity>
      </>
    </Page>
  );
}
