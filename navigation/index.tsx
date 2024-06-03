import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../components/BackButton';
import Login from '../screens/Login';
import Home from '../screens/Home';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, // Adicionando a opção headerShown: false
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
