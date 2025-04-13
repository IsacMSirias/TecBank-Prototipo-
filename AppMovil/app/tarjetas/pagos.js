import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Pagos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <TouchableOpacity
        onPress={() => router.push('/tarjetas/pagotarjeta')} 
        style={{
          backgroundColor: '#1565C0',
          padding: 16,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Pagos</Text>
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
