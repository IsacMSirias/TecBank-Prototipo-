import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Transferencias() {
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [monto, setMonto] = useState('');
  const router = useRouter();

  const handleTransfer = async () => {
    try {
      const cuentaOrigen = await AsyncStorage.getItem('cuentaADebitar');

      if (!cuentaOrigen) {
        Alert.alert('Error', 'No se encontró la cuenta a debitar.');
        return;
      }

      const [resOrigen, resDestino] = await Promise.all([
        fetch(`http://192.168.50.135:6969/api/Account/number/${cuentaOrigen}`),
        fetch(`http://192.168.50.135:6969/api/Account/number/${cuentaDestino}`)
      ]);

      if (!resOrigen.ok || !resDestino.ok) {
        throw new Error('No se pudieron obtener las cuentas.');
      }

      const dataOrigen = await resOrigen.json();
      const dataDestino = await resDestino.json();

      const montoNumero = parseFloat(monto);

      if (isNaN(montoNumero) || montoNumero <= 0) {
        Alert.alert('Error', 'El monto debe ser un número válido.');
        return;
      }

      if (dataOrigen.balance < montoNumero) {
        Alert.alert('Error', 'Fondos insuficientes en la cuenta de origen.');
        return;
      }

      const nuevaCuentaOrigen = {
        ...dataOrigen,
        balance: dataOrigen.balance - montoNumero
      };

      const nuevaCuentaDestino = {
        ...dataDestino,
        balance: dataDestino.balance + montoNumero
      };

      await fetch(`http://192.168.50.135:6969/api/Account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCuentaOrigen),
      });

      await fetch(`http://192.168.50.135:6969/api/Account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCuentaDestino),
      });

      await fetch(`http://192.168.50.135:6969/api/Transaction/account/${dataOrigen.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance: montoNumero,
          date: new Date().toISOString(),
          type: 'retiro'
        }),
      });

      await fetch(`http://192.168.50.135:6969/api/Transaction/account/${dataDestino.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance: montoNumero,
          date: new Date().toISOString(),
          type: 'deposito'
        }),
      });

      Alert.alert('Éxito', 'Transferencia realizada correctamente');
      setCuentaDestino('');
      setMonto('');
      router.push('/cuentas');

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al realizar la transferencia.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Transferencia</Text>

      <Text style={{ marginBottom: 5 }}>Cuenta destino</Text>
      <TextInput
        placeholder="Ej: 12345678"
        value={cuentaDestino}
        onChangeText={setCuentaDestino}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 10 }}
      />

      <Text style={{ marginBottom: 5 }}>Monto</Text>
      <TextInput
        placeholder="Ej: 50000"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={handleTransfer}
        style={{
          backgroundColor: '#1565C0',
          padding: 14,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Transferir</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
