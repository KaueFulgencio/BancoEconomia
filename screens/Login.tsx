import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
import { strings } from 'components/strings';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const BASE_URL = 'http://localhost:3001';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { access_token } = response.data;

      await AsyncStorage.setItem('token', access_token);

      //Alert.alert('Login Successful', `Token: ${access_token}`);
      
      navigation.navigate('Home', { email });
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Failed', 'Invalid Email or Password');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.loginTitle}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLogin}
          color="#FFA500"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Sign Up"
          onPress={handleSignUp}
          color="#FFA500"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFA500',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 10,
    width: '80%',
  },
});
