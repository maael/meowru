import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/screens/Main';
import EntryEdit from './components/screens/EntryEdit';
import EntryView from './components/screens/EntryView';
import User from './components/screens/User';
import Settings from './components/screens/Settings';
import {Screen, StackParamsList} from './types';

const Stack = createStackNavigator<StackParamsList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screen.Main} screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screen.Main} component={Main} />
        <Stack.Screen name={Screen.NewEntry} component={EntryEdit} />
        <Stack.Screen name={Screen.ExistingEntry} component={EntryView} />
        <Stack.Screen name={Screen.User} component={User} />
        <Stack.Screen name={Screen.Settings} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
