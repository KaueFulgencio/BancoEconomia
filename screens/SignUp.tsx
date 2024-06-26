import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { strings } from '../components/strings';
import { Picker } from '@react-native-picker/picker';

const BASE_URL = 'http://localhost:3001';

const SignUp: React.FC = () => {
  const navigation: any = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [typeAccount, setTypeAccount] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError(null);

    if (!name || !email || !password || !confirmPassword || !telephone || !occupation || !address || !typeAccount) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Por favor, digite um email válido.');
      return;
    }

    const phoneRegex = /^[0-9]{10,11}$/; 
    if (!phoneRegex.test(telephone)) {
      setError('Por favor, digite um número de telefone válido.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          telefone: telephone,
          nome: name,
          ocupacao: occupation,
          endereco: address,
          tipo: typeAccount,
          urlFotoAccount: photoUrl,
          password,
        }),
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      const data = await response.json();
      console.log('Account created successfully:', data);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.error('Error creating account:', error);
      setError('Falha ao criar a conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.signUpTitle}</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

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

      <TextInput
        style={styles.input}
        placeholder="Digite seu endereço"
        autoCapitalize="words"
        onChangeText={setAddress}
        value={address}
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
        placeholder="URL da foto do perfil"
        autoCapitalize="none"
        onChangeText={setPhotoUrl}
        value={photoUrl}
      />

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
          title={loading ? 'Registrando...' : 'Registre-se'}
          onPress={handleSignUp}
          color="#FFA500"
          disabled={loading}
        />
      </View>
    </View>
  );
};

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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
