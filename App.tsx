import 'react-native-get-random-values';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./components/screens/Main";
import EntryEdit from "./components/screens/EntryEdit";
import EntryView from "./components/screens/EntryView";
import User from "./components/screens/User";
import { Screen, StackParamsList } from "./types";
import { StoreProvider } from "./components/hooks/useAsyncStorage";

const Stack = createStackNavigator<StackParamsList>();

function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Screen.Main}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={Screen.Main} component={Main} />
          <Stack.Screen name={Screen.NewEntry} component={EntryEdit} />
          <Stack.Screen name={Screen.ExistingEntry} component={EntryView} />
          <Stack.Screen name={Screen.User} component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
