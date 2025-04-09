import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function PagoPrestamo() {
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('normal');
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Pago de Préstamo</Text>

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Tipo de pago (normal o extraordinario)"
        value={tipo}
        onChangeText={setTipo}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }}
      />

      <TouchableOpacity
        onPress={() => alert(`Pago ${tipo} registrado por ₡${monto}`)}
        style={{ backgroundColor: '#1565C0', padding: 14, borderRadius: 10, marginTop: 20 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
