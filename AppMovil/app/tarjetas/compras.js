import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const compras = [
  { id: '1', fecha: '2025-04-01', descripcion: 'Supermercado', monto: 25000 },
  { id: '2', fecha: '2025-04-02', descripcion: 'Restaurante', monto: 12000 },
];

export default function Compras() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Compras Realizadas</Text>

      <FlatList
        data={compras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: '#f4f4f4', borderRadius: 8, marginBottom: 10 }}>
            <Text>{item.fecha} - {item.descripcion}</Text>
            <Text>₡{item.monto.toLocaleString()}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
    