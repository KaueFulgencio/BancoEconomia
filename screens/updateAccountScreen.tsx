import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { strings } from 'components/strings';

type UpdateAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateAccountScreen'>;

const BASE_URL = 'http://localhost:3001';

interface UpdateAccountDetails {
  _id: string;
  email: string;
  telefone: string;
  nome: string;
  ocupacao: string;
  endereco: string;
  urlFotoAccount: string;
}

interface UpdateAccountScreenProps {
  email: string;
}

export default function UpdateAccountScreen({ route }: { route: { params: UpdateAccountScreenProps } }) {
  const { email } = route.params;
  const [accountDetails, setAccountDetails] = useState<UpdateAccountDetails>({
    _id: '',
    email: '',
    telefone: '',
    nome: '',
    ocupacao: '',
    endereco: '',
    urlFotoAccount: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const navigation = useNavigation<UpdateAccountScreenNavigationProp>();

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get<UpdateAccountDetails>(`${BASE_URL}/accounts/email/${email}`);
      setAccountDetails(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      setError(strings.accountDetailsError);  
      setLoading(false);
    }
  };

  const handleUpdateAccount = async () => {
    try {
      setUpdating(true);
      const response = await axios.patch<UpdateAccountDetails>(
        `${BASE_URL}/accounts/${email}`,
        {
          email: accountDetails.email,
          telefone: accountDetails.telefone,
          nome: accountDetails.nome,
          ocupacao: accountDetails.ocupacao,
          endereco: accountDetails.endereco,
          urlFotoAccount: accountDetails.urlFotoAccount,
        }
      );
      setAccountDetails(response.data);
      setUpdating(false);
      navigation.navigate('AccountScreen', { email: response.data.email });
    } catch (err) {
      console.error('Failed to update account details:', err);
      setUpdating(false);
      Alert.alert(strings.error, strings.accountUpdateFailed); 
    }
  };

  const handleChange = (key: keyof UpdateAccountDetails, value: string) => {
    setAccountDetails(prevState => ({
      ...prevState,
      [key]: value,
    }));
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
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFA500" />
        </Pressable>
        <Text style={styles.title}>{strings.accountDetailsReload}</Text>
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>{strings.accountDetailsEmail}</Text>
        <TextInput
          style={styles.input}
          value={accountDetails.email}
          onChangeText={text => handleChange('email', text)}
          editable={!updating}
        />

        <Text style={styles.label}>{strings.accountDetailsTelefone}</Text>
        <TextInput
          style={styles.input}
          value={accountDetails.telefone}
          onChangeText={text => handleChange('telefone', text)}
          editable={!updating}
        />

        <Text style={styles.label}>{strings.accountDetailsNome}</Text>
        <TextInput
          style={styles.input}
          value={accountDetails.nome}
          onChangeText={text => handleChange('nome', text)}
          editable={!updating}
        />

        <Text style={styles.label}>{strings.accountDetailsOcupacao}</Text>
        <TextInput
          style={styles.input}
          value={accountDetails.ocupacao}
          onChangeText={text => handleChange('ocupacao', text)}
          editable={!updating}
        />

        <Text style={styles.label}>{strings.accountDetailsEndereco}</Text>
        <TextInput
          style={styles.input}
          value={accountDetails.endereco}
          onChangeText={text => handleChange('endereco', text)}
          editable={!updating}
        />

        <Text style={styles.label}>{strings.accountDetailsUrlFoto}</Text>
        <TextInput
          style={styles.input}
          value={accountDetails.urlFotoAccount}
          onChangeText={text => handleChange('urlFotoAccount', text)}
          editable={!updating}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable style={styles.button} onPress={handleUpdateAccount} disabled={updating}>
          {updating ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{strings.accountDetailsReload}</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
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
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
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
