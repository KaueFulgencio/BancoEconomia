import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Container } from '../components/Container';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountScreen'>;

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface AccountData {
  accountHolder: string;
  balance: number;
  accountNumber: string;
  transactions: Transaction[];
}

const BASE_URL = 'http://localhost:3000'; 

export default function AccountScreen() {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<AccountScreenNavigationProp>();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/account/12345`);
        const data = await response.json();
        setAccountData(data);
      } catch (error) {
        console.error('Error fetching account data:', error);
        alert('Erro ao buscar dados da conta.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
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
        <Text style={styles.title}>Detalhes da Conta</Text>
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>Titular da Conta:</Text>
        <Text style={styles.value}>{accountData?.accountHolder}</Text>
        <Text style={styles.label}>Número da Conta:</Text>
        <Text style={styles.value}>{accountData?.accountNumber}</Text>
        <Text style={styles.label}>Saldo:</Text>
        <Text style={styles.value}>R$ {accountData?.balance.toFixed(2)}</Text>
      </View>
      <Text style={styles.sectionTitle}>Transações Recentes</Text>
      <FlatList
        data={accountData?.transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionAmount}>R$ {item.amount.toFixed(2)}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        )}
        style={styles.transactionList}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    marginLeft: 10,
  },
  accountInfo: {
    marginBottom: 20,
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA500',
    marginVertical: 10,
  },
  transactionList: {
    marginTop: 10,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
});
