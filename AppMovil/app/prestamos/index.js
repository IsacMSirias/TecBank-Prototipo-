import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const prestamos = [
  { id: 1, monto: 500000, saldo: 300000, interes: 10.5 },
  { id: 2, monto: 200000, saldo: 150000, interes: 8.25 },
];

export default function Prestamos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Préstamos</Text>

      <FlatList
        data={prestamos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#eee', padding: 16, borderRadius: 10, marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Monto: ₡{item.monto.toLocaleString()}</Text>
            <Text>Saldo pendiente: ₡{item.saldo.toLocaleString()}</Text>
            <Text>Interés: {item.interes}%</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={{ backgroundColor: '#1565C0', padding: 14, borderRadius: 10 }}
        onPress={() => router.push('/prestamos/pagoprestamo')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Pagar Préstamo</Text>
      </TouchableOpacity>
    </View>
  );
}
