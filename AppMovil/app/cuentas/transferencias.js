import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Transferencias() {
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [monto, setMonto] = useState('');
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Transferencia</Text>

      <TextInput
        placeholder="Cuenta destino"
        value={cuentaDestino}
        onChangeText={setCuentaDestino}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
      />

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={() => alert('Transferencia realizada')}
        style={{ backgroundColor: '#1565C0', padding: 14, borderRadius: 10, marginTop: 20 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Transferir</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
