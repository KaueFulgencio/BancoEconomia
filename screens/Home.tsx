import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import { strings } from '../components/strings';
import { Container } from '../components/Container';
import axios from 'axios';
import { RootStackParamList } from '../navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const BASE_URL = 'http://localhost:3001';

const Home: React.FC = () => {
  return (
    <Container>
      <Content />
    </Container>
  );
};

const Content: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(false); 
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToTransferScreen = () => {
    alert('Navegar para a tela de transferências');
  };

  const goToPaymentsScreen = () => {
    alert('Navegar para a tela de pagamentos');
  };

  const goToInvestmentsScreen = () => {
    alert('Navegar para a tela de investimentos');
  };

  const goToMyAccount = () => {
    navigation.navigate('AccountScreen');
  };

  const goToPixArea = () => {
    navigation.navigate('PixArea');
  };

  const checkBalance = async () => {
    setBalanceLoading(true);
    try {
      const accountId = '665e5694dd8fe574a01170ef'; 
      const response = await axios.get(`${BASE_URL}/accounts/${accountId}/saldo`);
      setBalance(response.data.balance);
      setShowBalance(true); 
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setBalanceLoading(false);
    }
  };

  const toggleShowBalance = () => {
    if (showBalance) {
      setShowBalance(false);
    } else {
      checkBalance();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.welcomeMessage}</Text>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>{strings.balanceLabel}</Text>
        <Pressable onPress={toggleShowBalance}>
          {balanceLoading ? (
            <ActivityIndicator size="small" color="#FFA500" />
          ) : (
            <Ionicons name={showBalance ? 'eye-off-outline' : 'eye-outline'} size={24} color="#FFA500" />
          )}
        </Pressable>
      </View>
      
      {showBalance && (
        <View style={styles.balanceAmountContainer}>
          <Text style={styles.balanceAmount}>{balance !== null ? `R$ ${balance.toFixed(2)}` : '---'}</Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={goToMyAccount}>
          <Text style={styles.buttonText}>{strings.myAccount}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goToTransferScreen}>
          <Text style={styles.buttonText}>{strings.transferButton}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goToPaymentsScreen}>
          <Text style={styles.buttonText}>{strings.paymentsButton}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goToInvestmentsScreen}>
          <Text style={styles.buttonText}>{strings.investmentsButton}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goToPixArea}>
          <Text style={styles.buttonText}>{strings.pixKeys}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFA500',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#FFA500',
  },
  balanceAmountContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
