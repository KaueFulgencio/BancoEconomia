import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
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
      const response = await axios.get(`http://localhost:3001/accounts/665e5694dd8fe574a01170ef/pix`);
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
    alert('Navegar para cadastrar chave PIX');
  };

  const listPixKeys = () => {
    fetchPixKeys();
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
          renderItem={({ item }) => (
            <View style={styles.pixKeyItem}>
              <Text style={styles.pixKeyText}>Tipo: {item.type}</Text>
              <Text style={styles.pixKeyText}>Chave: {item.key}</Text>
            </View>
          )}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pixKeyText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PixArea;
