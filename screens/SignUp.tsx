import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { strings } from '../components/strings';
import { Picker } from '@react-native-picker/picker';

export default function SignUp() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [typeAccount, setTypeAccount] = useState('');
  const navigation: any = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          cpf,
          email,
          senha: password,
          telefone: telephone,
          ocupacao: occupation,
          tipo: typeAccount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      const data = await response.json();
      console.log('Account created successfully:', data);
      Alert.alert('Successo', 'Conta criada com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Erro', 'Falha ao criar a conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.signUpTitle}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        keyboardType="default"
        autoCapitalize="words"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        onChangeText={setCpf}
        value={cpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        keyboardType="phone-pad"
        onChangeText={setTelephone}
        value={telephone}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua profissão"
        autoCapitalize="words"
        onChangeText={setOccupation}
        value={occupation}
      />

      <Picker
        selectedValue={typeAccount}
        onValueChange={(value) => setTypeAccount(value)}
        style={styles.picker}
      >
        <Picker.Item label="MEI" value="MEI" />
        <Picker.Item label="PJ" value="PJ" />
        <Picker.Item label="PF" value="PF" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFA500',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});
