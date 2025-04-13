import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';

export default function DetalleCuenta() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const fetchTransacciones = async () => {
      const cuentaId = sessionStorage.getItem('cuentaADebitar');
      if (!cuentaId) {
        Alert.alert('Error', 'No se encontró la cuenta seleccionada.');
        return;
      }

      try {
        const res = await fetch(`http://192.168.50.135:6969/api/Account/number/${cuentaId}`); // IP actualizada
        const data = await res.json();

        if (!res.ok) {
          Alert.alert('Error', `Error al obtener las transacciones: ${data.value}`);
          return;
        }

        if (!data || !Array.isArray(data.transactions)) {
          Alert.alert('Error', 'No se encontraron transacciones para esta cuenta.');
          return;
        }

        setMovimientos(data.transactions);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al cargar las transacciones.');
      }
    };

    fetchTransacciones();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Detalle de Cuenta</Text>

      <FlatList
        data={movimientos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: '#eee', marginTop: 10, borderRadius: 8 }}>
            <Text style={{ color: item.type === 'retiro' ? 'red' : 'green', fontWeight: 'bold' }}>
              {item.type === 'deposito' ? 'Depósito' : 'Retiro'}
            </Text>
            <Text style={{ color: item.type === 'retiro' ? 'red' : 'green' }}>
              ₡{item.balance.toLocaleString()}
            </Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push('/cuentas/transferencias')}
        style={{ marginTop: 20, backgroundColor: '#1565C0', padding: 14, borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Transferir
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/tarjetas')}
        style={{ marginTop: 20, backgroundColor: '#4CAF50', padding: 14, borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Ver Tarjetas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 30, padding: 12, borderRadius: 8, backgroundColor: '#E0E0E0', alignItems: 'center' }}
      >
        <Text style={{ color: '#1565C0', fontWeight: 'bold' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
