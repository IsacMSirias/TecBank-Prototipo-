import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PagoTarjeta() {
  const [monto, setMonto] = useState('');
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Pago de Tarjeta</Text>

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={() => alert('Pago realizado')}
        style={{ marginTop: 20, backgroundColor: '#1565C0', padding: 14, borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
