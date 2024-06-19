import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../components/BackButton';
import Login from '../screens/Login';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import PixArea from 'screens/PixArea';
import AccountScreen from 'screens/AccountScreen';
import UpdateAccountScreen from 'screens/updateAccountScreen';
import CreatePixKeyScreen from 'screens/PIX/CreatePixScreen';
import SendPixScreen from 'screens/PIX/SendPix';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  Login: undefined;
  Home: { email: string };
  SignUp: undefined;
  PixArea: { email: string};
  AccountScreen: { email: string};
  UpdateAccountScreen: { email: string };
  CreatePixKeyScreen: {email: string};
  SendPixScreen: undefined;
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
            headerShown: false, 
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, 
          })}
        />
        <Stack.Screen
          name="PixArea"
          component={PixArea}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, 
          })}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, 
          })}
        />
        <Stack.Screen
          name="UpdateAccountScreen"
          component={UpdateAccountScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, 
          })}
        />
        <Stack.Screen
          name="CreatePixKeyScreen"
          component={CreatePixKeyScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, 
          })}
        />
        <Stack.Screen
          name="SendPixScreen"
          component={SendPixScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            headerShown: false, 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
