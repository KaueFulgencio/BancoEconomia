import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container } from '../components/Container';

const BASE_URL = 'http://localhost:3001';

interface Transaction {
  _id: string;
  type: 'entrada' | 'saída';
  amount: number;
  description?: string;
  date: string;  // Note that the field is named 'date' as per your response body
}

export default function BankStatementsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { email } = route.params as { email: string };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Transaction[]>(`${BASE_URL}/transaction/${email}/transactions`);
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError("Failed to fetch transactions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Transaction }) => {
    const date = new Date(item.date);
    const formattedDate = !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid Date';

    return (
      <View style={styles.transactionItem}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionAmount}>{item.type === 'entrada' ? '+' : '-'}R$ {item.amount.toFixed(2)}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{formattedDate}</Text>
      </View>
    );
  };

  return (
    <Container>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFA500" />
        </Pressable>
        <Text style={styles.title}>Extrato Bancário</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transactionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 18,
    color: '#000',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666',
  },
  transactionDate: {
    fontSize: 12,
    color: '#aaa',
  },
});
