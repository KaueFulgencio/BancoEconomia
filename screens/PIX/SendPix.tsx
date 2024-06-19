import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '../../components/Container';

type SendPixScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SendPixScreen'>;

type Props = {
  navigation: SendPixScreenNavigationProp;
};

const SendPixScreen: React.FC<Props> = ({ navigation }) => {
  const [fromAccount, setFromAccount] = useState<string>(''); // Conta de origem (poderia ser obtida do usuário logado)
  const [toAccount, setToAccount] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendPix = async () => {
    try {
      setLoading(true);
      const requestBody = { fromAccount, toAccount, amount: parseFloat(amount) };

      const response = await axios.post('http://localhost:3001/pix/send', requestBody);

      setLoading(false);
      Alert.alert('Sucesso', 'PIX enviado com sucesso!');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as any;
        const { message, statusCode } = axiosError.response?.data || {};
        setError(message || error.message || 'Erro ao enviar o PIX.');
      } else {
        setError('Erro ao enviar o PIX.');
      }
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFA500" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Enviar PIX</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Conta de origem"
            value={fromAccount}
            onChangeText={setFromAccount}
          />
          <TextInput
            style={styles.input}
            placeholder="Conta de destino"
            value={toAccount}
            onChangeText={setToAccount}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Pressable style={styles.button} onPress={handleSendPix}>
            <Text style={styles.buttonText}>Enviar PIX</Text>
          </Pressable>
        </View>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#FFA500" />
            <Text style={styles.loaderText}>Enviando PIX...</Text>
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, 
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
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
  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default SendPixScreen;
