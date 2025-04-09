import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const tramites = [
  { id: 1, tipo: 'Solicitud de tarjeta', estado: 'En proceso' },
  { id: 2, tipo: 'Actualización de datos', estado: 'Completado' },
];

export default function Tramites() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Trámites</Text>

      <FlatList
        data={tramites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 15, backgroundColor: '#eee', borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.tipo}</Text>
            <Text>Estado: {item.estado}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
