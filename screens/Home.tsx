import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { strings } from '../components/strings';
import { Container } from '../components/Container';
import { RootStackParamList } from '../navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const BASE_URL = 'http://localhost:3000';

export default function Home() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

const Content: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${BASE_URL}/accounts/665e5694dd8fe574a01170ef/saldo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setBalance(`R$ ${data.balance.toFixed(2)}`);
      } catch (error) {
        console.error('Error fetching balance:', error);
        alert('Falha ao buscar saldo. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const checkBalance = () => {
    if (balance) {
      alert(`Seu saldo atual é de ${balance}`);
    } else {
      alert('Saldo não disponível');
    }
  };

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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.welcomeMessage}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>{strings.balanceLabel}</Text>
        <Text style={styles.balanceAmount}>{balance}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={goToMyAccount}>
          <Text style={styles.buttonText}>{strings.myAccount}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={checkBalance}>
          <Text style={styles.buttonText}>{strings.checkBalanceButton}</Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 70,
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
