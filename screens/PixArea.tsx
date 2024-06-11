import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { strings } from '../components/strings';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type PixAreaNavigationProp = StackNavigationProp<RootStackParamList, 'PixArea'>;

type Props = {
  navigation: PixAreaNavigationProp;
};

const PixArea: React.FC<Props> = ({ navigation }) => {

  const createPixKey = () => {
    alert('Navegar para cadastrar chave PIX');
  };

  const listPixKeys = () => {
    alert('Navegar para listar suas chaves PIX');
  };

  const sendPix = () => {
    alert('Navegar para enviar PIX');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFA500" />
        </Pressable>
        <Text style={styles.title}>{strings.pixAreaTitle}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={createPixKey}>
          <Text style={styles.buttonText}>{strings.pixAreaCreate}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={listPixKeys}>
          <Text style={styles.buttonText}>{strings.pixAreaListPixKeys}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={sendPix}>
          <Text style={styles.buttonText}>{strings.pixArea}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FFA500',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PixArea;
