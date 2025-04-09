import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const movimientos = [
  { id: 1, tipo: 'Depósito', monto: 100000, fecha: '2025-04-01' },
  { id: 2, tipo: 'Retiro', monto: -25000, fecha: '2025-04-05' },
];

export default function DetalleCuenta() {
  const router = useRouter();

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Detalle de Cuenta</Text>

      <FlatList
        data={movimientos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: '#eee', marginTop: 10, borderRadius: 8 }}>
            <Text>{item.tipo}</Text>
            <Text style={{ color: item.monto < 0 ? 'red' : 'green' }}>
              ₡{item.monto.toLocaleString()}
            </Text>
            <Text>{item.fecha}</Text>
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

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
