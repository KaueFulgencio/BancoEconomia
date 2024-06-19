import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

type CreatePixKeyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePixKeyScreen'>;
type CreatePixKeyScreenRouteProp = RouteProp<RootStackParamList, 'CreatePixKeyScreen'>;

type Props = {
  navigation: CreatePixKeyScreenNavigationProp;
  route: CreatePixKeyScreenRouteProp;
};

const CreatePixKeyScreen: React.FC<Props> = ({ navigation, route }) => {
  const [key, setKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<'CPF' | 'TELEFONE' | 'EMAIL' | 'CHAVE_ALEATORIA'>('CPF');

  const handleCreatePixKey = async () => {
    try {
      if (type !== 'CHAVE_ALEATORIA' && !key) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }

      setLoading(true);

      let requestBody = { key, type };

      if (type === 'CHAVE_ALEATORIA') {
        const generatedKey = generateRandomKey();
        setKey(generatedKey);
        requestBody = { key: generatedKey, type };
      }

      const response = await axios.post('http://localhost:3001/pix/6660aab794fddd007ab7e331', requestBody);
      setLoading(false);
      Alert.alert('Sucesso', 'Chave PIX cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.error('Erro ao cadastrar a chave PIX:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a chave PIX.');
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FFA500',
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
});

export default CreatePixKeyScreen;
