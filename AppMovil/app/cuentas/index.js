import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cuentas() {
  const router = useRouter();
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCuentas = async () => {
    try {
      const idCliente = await AsyncStorage.getItem('idCliente');
      console.log(`El ID del cliente es: ${idCliente}`);

      if (!idCliente) {
        setError('No se ha encontrado un id de cliente');
        setLoading(false);
        return;
      }

      const url = `http://192.168.50.135:6969/api/Client/${idCliente}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta del cliente con cuentas:", data);
      setCuentas(data.accounts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando cuentas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (cuentas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tienes cuentas registradas.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Cuentas</Text>

      <FlatList
        data={cuentas}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem('cuentaADebitar', item.number.toString());
              router.push(`/cuentas/${item.number}`);
            }}
            style={{
              backgroundColor: '#f4f4f4',
              padding: 16,
              borderRadius: 12,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
            <Text>{item.balance.toLocaleString()} - {item.currency}</Text>
            <Text style={{ fontSize: 12 }}>N° {item.number}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
