import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/Main';
import { Text, View } from 'react-native';
import {Screen, StackParamsList, RouteParams} from './types';

const Stack = createStackNavigator<StackParamsList>();

function NewEntry () {
  return (
    <View>
      <Text>New Entry</Text>
    </View>
  )
}

function ExistingEntry () {
  const route = useRoute<RouteParams<Screen.ExistingEntry>>();
  return (
    <View>
      <Text>{route.params.entryId} Entry</Text>
    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screen.Main}>
        <Stack.Screen name={Screen.Main} component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name={Screen.NewEntry} component={NewEntry} options={{headerShown: true}} />
        <Stack.Screen name={Screen.ExistingEntry} component={ExistingEntry} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
