import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function Login() {
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const navigation: any = useNavigation();

  const handleLogin = () => {
    console.log('CPF:', cpf);
    console.log('Password:', password); 

    navigation.navigate('Home', {
      params: { CPF: cpf}
    }); 
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter CPF"
        keyboardType="numeric"
        autoCapitalize="none"
        onChangeText={setCPF}
        value={cpf}
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
                title="Registre-se"
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