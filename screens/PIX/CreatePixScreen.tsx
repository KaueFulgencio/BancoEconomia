import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native';
import axios, { AxiosError } from 'axios'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreatePixKeyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePixKeyScreen'>;
type CreatePixKeyScreenRouteProp = RouteProp<RootStackParamList, 'CreatePixKeyScreen'>;

type Props = {
  navigation: CreatePixKeyScreenNavigationProp;
  route: CreatePixKeyScreenRouteProp;
};

const BASE_URL = 'http://localhost:3001';

const CreatePixKeyScreen: React.FC<Props> = ({ navigation, route }) => {
  const { email } = route.params; 

  const [key, setKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<'CPF' | 'TELEFONE' | 'EMAIL' | 'CHAVE_ALEATORIA'>('CPF');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCreatePixKey = async () => {
    try {
      if (type !== 'CHAVE_ALEATORIA' && !key) {
        setErrorMessage('Por favor, preencha todos os campos.');
        return;
      }
  
      setLoading(true);
  
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.error('Token não encontrado no AsyncStorage');
        setLoading(false);
        return;
      }
  
      let requestBody = { key, type, email };
  
      if (type === 'CHAVE_ALEATORIA') {
        const generatedKey = generateRandomKey();
        setKey(generatedKey);
        requestBody = { key: generatedKey, type, email };
      }
  
      const response = await axios.post(`${BASE_URL}/pix/${email}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setLoading(false);
      setErrorMessage('');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.error('Erro ao cadastrar a chave PIX:', error);
  
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
          setErrorMessage(axiosError.response.data.message);
        } else {
          setErrorMessage('Não foi possível cadastrar a chave PIX.');
        }
      } else {
        setErrorMessage('Não foi possível cadastrar a chave PIX.');
      }
    }
  };
  

  const generateRandomKey = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomKey = '';
    for (let i = 0; i < 16; i++) {
      randomKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomKey;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFA500" />
        </Pressable>
      </View>
      <View style={styles.form}>
        <Picker
          selectedValue={type}
          style={styles.input}
          onValueChange={(itemValue) => {
            setType(itemValue as 'CPF' | 'TELEFONE' | 'EMAIL' | 'CHAVE_ALEATORIA');
            if (itemValue === 'CHAVE_ALEATORIA') {
              const generatedKey = generateRandomKey();
              setKey(generatedKey);
            }
          }}>
          <Picker.Item label="CPF" value="CPF" />
          <Picker.Item label="Telefone" value="TELEFONE" />
          <Picker.Item label="E-mail" value="EMAIL" />
          <Picker.Item label="Chave Aleatória" value="CHAVE_ALEATORIA" />
        </Picker>

        <TextInput
          style={[styles.input, type === 'CHAVE_ALEATORIA' && styles.disabledInput]}
          placeholder="Chave PIX"
          value={key}
          onChangeText={setKey}
          keyboardType="numeric"
          editable={type !== 'CHAVE_ALEATORIA'}
        />
        <Pressable style={styles.button} onPress={handleCreatePixKey}>
          <Text style={styles.buttonText}>Cadastrar Chave PIX</Text>
        </Pressable>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loaderText}>Carregando...</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default CreatePixKeyScreen;
