import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
        Menú Principal 🏦
      </Text>

      <TouchableOpacity
        style={button}
        onPress={() => router.push('/cuentas')}
      >
        <Text style={buttonText}>Ver Cuentas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button}
        onPress={() => router.push('/tarjetas')}
      >
        <Text style={buttonText}>Ver Tarjetas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button}
        onPress={() => router.push('/prestamos')}
      >
        <Text style={buttonText}>Ver Préstamos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button}
        onPress={() => router.push('/tramites')}
      >
        <Text style={buttonText}>Ver Trámites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1565C0' }]}
        onPress={() => router.replace('/')}
      >
        <Text style={[buttonText, { color: '#1565C0' }]}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const button = {
  backgroundColor: '#1565C0',
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 15,
};

const buttonText = {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
};
