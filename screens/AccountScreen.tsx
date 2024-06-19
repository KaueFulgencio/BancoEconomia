import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/Container';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { strings } from 'components/strings';

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

interface AccountScreenRouteProps {
  email: string;
}

export default function AccountScreen() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const route = useRoute();

  const { email } = route.params as AccountScreenRouteProps;

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get<AccountDetails>(`${BASE_URL}/accounts/email/${email}`);
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

  const handleUpdatePress = () => {
    if (accountDetails) {
      navigation.navigate('UpdateAccountScreen', { email: accountDetails.email });
    }
  };

  const handleReload = () => {
    fetchAccountDetails();
  };

  return (
    <Container>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFA500" />
        </Pressable>
        <Text style={styles.title}>{strings.accountDetails}</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.accountInfo}>
          <Text style={styles.label}>{strings.accountDetailsEmail}</Text>
          <Text style={styles.value}>{accountDetails?.email}</Text>

          <Text style={styles.label}>{strings.accountDetailsTelefone}</Text>
          <Text style={styles.value}>{accountDetails?.telefone}</Text>

          <Text style={styles.label}>{strings.accountDetailsNome}</Text>
          <Text style={styles.value}>{accountDetails?.nome}</Text>

          <Text style={styles.label}>{strings.accountDetailsOcupacao}</Text>
          <Text style={styles.value}>{accountDetails?.ocupacao}</Text>

          <Text style={styles.label}>{strings.accountDetailsEndereco}</Text>
          <Text style={styles.value}>{accountDetails?.endereco}</Text>

          <Text style={styles.label}>{strings.accountDetailsTipo}</Text>
          <Text style={styles.value}>{accountDetails?.tipo}</Text>

          <Text style={styles.value}>R$ {accountDetails?.saldo.toFixed(2)}</Text>

          <Pressable style={styles.reloadButton} onPress={handleReload}>
            <Ionicons name="refresh-outline" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>{strings.reload}</Text>
          </Pressable>

          <Pressable style={styles.updateButton} onPress={handleUpdatePress}>
            <Text style={styles.buttonText}>{strings.accountDetailsReload}</Text>
          </Pressable>
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  reloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFA500',
  },
  updateButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
