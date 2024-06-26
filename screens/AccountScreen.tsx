import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '../components/Container';
import { strings } from 'components/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  urlFotoAccount: string; 
}

interface AccountScreenRouteProps {
  email: string;
}

export default function AccountScreen() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const route = useRoute();

  const { email } = route.params as AccountScreenRouteProps;

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
  
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.error('Token não encontrado no AsyncStorage');
        return;
      }
  
      const response = await axios.get<AccountDetails>(`${BASE_URL}/accounts/email/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
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

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.error('Token não encontrado no AsyncStorage');
        return;
      }
  
      await axios.delete(`${BASE_URL}/auth/delete-account/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setShowDeleteModal(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      setShowDeleteModal(false);
      setError('Falha ao deletar conta. Por favor, tente novamente.');
    }
  };
  

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: accountDetails?.urlFotoAccount }}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <View style={styles.profileDetails}>
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
              </View>
            </View>

            <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
              <Ionicons name="refresh-outline" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>{strings.reload}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePress}>
              <Text style={styles.buttonText}>{strings.accountDetailsReload}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.buttonText}>Deletar Conta</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={showDeleteModal}
              onRequestClose={() => setShowDeleteModal(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Tem certeza que deseja deletar a conta?</Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: 'red' }]}
                      onPress={() => setShowDeleteModal(false)}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: '#FFA500' }]}
                      onPress={confirmDeleteAccount}
                    >
                      <Text style={styles.buttonText}>Deletar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
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
  deleteButton: {
    backgroundColor: 'red',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    minWidth: 300,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
});