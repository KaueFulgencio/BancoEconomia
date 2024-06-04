import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { strings } from 'components/strings';
import { Picker } from '@react-native-picker/picker';

export default function SignUp() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [typeaccount, setTypeAccount] = useState('');
  const navigation: any = useNavigation();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Name', name);
    console.log('Cpf', cpf);
    console.log('Telefone', telephone);
    console.log('Ocupação', occupation);
    console.log('Tipo da conta(MEI, PJ)', typeaccount);
    console.log('Password:', password); 

    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {strings.signUpTitle}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        secureTextEntry={true}
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
        keyboardType="numeric"
        secureTextEntry={true}
        onChangeText={setTelephone}
        value={telephone}
      />

    <TextInput
        style={styles.input}
        placeholder="Digite sua profissão"
        autoCapitalize="none"
        onChangeText={setOccupation}
        value={occupation}
      />

    
    <Picker
        selectedValue={typeaccount}
        onValueChange={(value) => setTypeAccount(value)}
        style={styles.picker} 
      >
        <Picker.Item label="MEI" value="MEI" />
        <Picker.Item label="PJ" value="PJ" />
        <Picker.Item label="PJ" value="PF" />
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
        onChangeText={setPassword}
        value={password}
      />


        <View style={styles.buttonContainer}>
            <Button 
            title="Registre-se"
            onPress={handleLogin}
            color="#FFA500"
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    marginLeft: -220
  },
  buttonSignUp: {
    backgroundColor: '#FFA500', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 90,
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
  picker: {
    width: '80%', 
    height: 50, 
    borderColor: '#FFA500',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});