import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { strings } from '../components/strings';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from 'axios';

type PixAreaNavigationProp = StackNavigationProp<RootStackParamList, 'PixArea'>;

type Props = {
  navigation: PixAreaNavigationProp;
};

interface PixKey {
  _id: string;
  type: string;
  key: string;
}

const PixArea: React.FC<Props> = ({ navigation }) => {
  const [pixKeys, setPixKeys] = useState<PixKey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPixKeys = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/pix/6660aab794fddd007ab7e331`);
      setPixKeys(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch Pix keys.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPixKeys();
  }, []);

  const createPixKey = () => {
    navigation.navigate('CreatePixKeyScreen');
  };

  const listPixKeys = () => {
    fetchPixKeys();
  };

  const sendPix = () => {
    navigation.navigate('SendPixScreen')
  };

  const deletePixKey = async (pixId: string) => {
    try {
      await axios.delete(`http://localhost:3001/pix/6660aab794fddd007ab7e331/${pixId}`);
      fetchPixKeys(); 
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível excluir a chave PIX.');
    }
  };

  const renderPixKeyItem = ({ item }: { item: PixKey }) => (
    <View style={styles.pixKeyItem}>
      <Text style={styles.pixKeyText}>Tipo: {item.type}</Text>
      <Text style={styles.pixKeyText}>Chave: {item.key}</Text>
      <Pressable
        onPress={() => deletePixKey(item._id)}
        style={({ pressed }) => [
          styles.deleteButton,
          { backgroundColor: pressed ? 'darkred' : 'red' },
        ]}
      >
        <Icon name="trash" size={20} color="#FFFFFF" />
      </Pressable>
    </View>
  );

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
          <Text style={styles.buttonText}>{strings.pixAreaSendPix}</Text>
        </Pressable>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={pixKeys}
          keyExtractor={(item) => item._id}
          renderItem={renderPixKeyItem}
          style={styles.pixKeyList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FFA500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  pixKeyList: {
    marginTop: 20,
  },
  pixKeyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pixKeyText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PixArea;
