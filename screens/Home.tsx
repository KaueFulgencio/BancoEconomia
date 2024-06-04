import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { strings } from '../components/strings';
import { Container } from 'components/Container';

export default function Home() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Content() {
  const [balance, setBalance] = useState(strings.balanceAmount);
  
  const consumeBalance = async () => {
    try {
      const response = await fetch('/accounts/665e5694dd8fe574a01170ef/saldo', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to consume balance');
      }
  
      const data = await response.json();
  
      console.log('Balance consumed successfully:', data);
      alert(`Saldo consumido com sucesso!`);
      setBalance(data.newBalance); 
    } catch (error) {
      console.error('Error consuming balance:', error);
      alert('Falha ao consumir saldo. Tente novamente.');
    }
  };
  

  const checkBalance = () => {
    alert(`Seu saldo atual é de ${balance}`); 
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
    alert('Sua conta')
  }

  const goToPixArea = () => {
    alert('Area Pix')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.welcomeMessage}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>{strings.balanceLabel}</Text>
        <Text style={styles.balanceAmount}>{strings.balanceAmount}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title={strings.myAccount} onPress={goToMyAccount} color="#FFA500" />
        <Button title={strings.checkBalanceButton} onPress={consumeBalance} color="#FFA500" />
        <Button title={strings.transferButton} onPress={goToTransferScreen} color="#FFA500" />
        <Button title={strings.paymentsButton} onPress={goToPaymentsScreen} color="#FFA500" />
        <Button title={strings.investmentsButton} onPress={goToInvestmentsScreen} color="#FFA500" />
        <Button title={strings.pixKeys} onPress={goToPixArea} color="#FFA500" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
