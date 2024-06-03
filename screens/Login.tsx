import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation: any = useNavigation();

  const handleLogin = () => {
    // Implemente sua lógica de login aqui (por exemplo, autenticação com backend)
    console.log('Email:', email);
    console.log('Password:', password); // Para fins de demonstração

    // Supondo login bem-sucedido, navegue para a tela desejada
    navigation.navigate('Home'); // Navegar para a tela Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
    color: '#FFA500', // Cor laranja
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
    width: '80%',
  },
});