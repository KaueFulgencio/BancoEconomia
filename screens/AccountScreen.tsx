import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/Container';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountScreen'>;

const BASE_URL = 'http://localhost:3001';

interface AccountDetails {
  _id: string;
  email: string;
  telefone: string;
  nome: string;
  ocupacao: string;
  endereco: string;
  tipo: string;
  saldo: number;
  createdAt: string;
  updatedAt: string;
}

export default function AccountScreen() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<AccountScreenNavigationProp>();

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const accountId = '665e5694dd8fe574a01170ef'; 
      const response = await axios.get<AccountDetails>(`${BASE_URL}/accounts/${accountId}`);
      setAccountDetails(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      setError("Failed to fetch account details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFA500" />
        </Pressable>
        <Text style={styles.title}>Detalhes da Conta</Text>
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{accountDetails?.email}</Text>

        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{accountDetails?.telefone}</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{accountDetails?.nome}</Text>

        <Text style={styles.label}>Ocupação:</Text>
        <Text style={styles.value}>{accountDetails?.ocupacao}</Text>

        <Text style={styles.label}>Endereço:</Text>
        <Text style={styles.value}>{accountDetails?.endereco}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{accountDetails?.tipo}</Text>

        <Text style={styles.label}>Saldo:</Text>
        <Text style={styles.value}>R$ {accountDetails?.saldo.toFixed(2)}</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable style={styles.button} onPress={fetchAccountDetails}>
          <Text style={styles.buttonText}>Atualizar Detalhes</Text>
        </Pressable>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    marginLeft: 10,
  },
  accountInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
