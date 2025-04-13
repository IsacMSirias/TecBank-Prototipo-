import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalleTarjeta() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const fetchMovimientosTarjeta = async () => {
      try {
        const tarjetaId = await AsyncStorage.getItem('tarjetaSeleccionada');
        if (!tarjetaId) {
          Alert.alert('Error', 'No se encontró la tarjeta seleccionada.');
          return;
        }

        const res = await fetch(`http://192.168.50.135:6969/api/Card/number/${tarjetaId}`); // <--- IP actualizada
        const data = await res.json();

        if (!res.ok) {
          Alert.alert('Error', `Error al obtener los movimientos: ${data.value}`);
          return;
        }

        if (!data || !Array.isArray(data.transactions)) {
          Alert.alert('Error', 'No se encontraron movimientos para esta tarjeta.');
          return;
        }

        setMovimientos(data.transactions);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al cargar los movimientos.');
      }
    };

    fetchMovimientosTarjeta();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Detalle de Tarjeta
      </Text>

      <FlatList
        data={movimientos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: '#eee', marginTop: 10, borderRadius: 8 }}>
            <Text style={{ color: item.type === 'pago' ? 'green' : 'red', fontWeight: 'bold' }}>
              {item.type === 'pago' ? 'Pago' : 'Consumo'}
            </Text>
            <Text style={{ color: item.type === 'pago' ? 'green' : 'red' }}>
              ₡{item.balance.toLocaleString()}
            </Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push('/tarjetas/pagotarjeta')}
        style={{
          marginTop: 20,
          backgroundColor: '#1565C0',
          padding: 16,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Pagar Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 20,
          padding: 12,
          borderRadius: 8,
          backgroundColor: '#E0E0E0',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#1565C0', fontWeight: 'bold' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
