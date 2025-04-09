import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Tarjetas() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Tarjetas</Text>

      <TouchableOpacity
        style={{ backgroundColor: '#1565C0', padding: 14, borderRadius: 10, marginBottom: 10 }}
        onPress={() => router.push('/tarjetas/pagotarjeta')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Pagar Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: '#1565C0', padding: 14, borderRadius: 10 }}
        onPress={() => router.push('/tarjetas/compras')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Ver Compras</Text>
      </TouchableOpacity>
    </View>
  );
}
