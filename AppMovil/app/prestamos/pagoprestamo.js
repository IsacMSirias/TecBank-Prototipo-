import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PagoPrestamo() {
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('normal');
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cargarDatos = async () => {
      const idCliente = await AsyncStorage.getItem('idCliente');
      if (!idCliente) {
        Alert.alert('Error', 'No se encontró el ID del cliente');
        return;
      }

      try {
        const res = await fetch(`http://192.168.50.135:6969/api/Client/${idCliente}`);
        const data = await res.json();
        setCuentas(data.accounts || []);
        await AsyncStorage.setItem('clienteConPrestamos', JSON.stringify(data));
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    };

    cargarDatos();
  }, []);

  const handlePago = async () => {
    console.log("handlePago se está ejecutando");

    const prestamoId = await AsyncStorage.getItem('prestamoASeleccionar');
    const clienteRaw = await AsyncStorage.getItem('clienteConPrestamos');
    const cliente = clienteRaw ? JSON.parse(clienteRaw) : null;

    if (!prestamoId || !cuentaSeleccionada || !monto || !cliente) {
      Alert.alert('Error', 'Faltan datos para realizar el pago.');
      return;
    }

    const cuenta = cuentas.find(c => c.number === cuentaSeleccionada);
    const prestamo = cliente.loans?.find(p => p.id == prestamoId);

    if (!cuenta || !prestamo) {
      Alert.alert('Error', 'No se encontró el préstamo o la cuenta.');
      return;
    }

    const montoNum = parseFloat(monto);
    const extra = tipo === 'extraordinario' ? 10 : 0;
    const totalDescontar = montoNum + extra;

    if (cuenta.balance < totalDescontar) {
      Alert.alert('Error', 'Saldo insuficiente en la cuenta seleccionada.');
      return;
    }

    // Aplicar el pago localmente
    cuenta.balance -= totalDescontar;
    prestamo.debt -= montoNum;

    try {
      const resCuenta = await fetch(`http://192.168.50.135:6969/api/Account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id: cuenta.id,
          Description: cuenta.description,
          Balance: cuenta.balance,
          Currency: cuenta.currency,
          Number: cuenta.number,
          Type: cuenta.type,
          ClientId: cuenta.clientId,
        }),
      });

      const updatedAccount = await resCuenta.json();

      const resPrestamo = await fetch(`http://192.168.50.135:6969/api/Loan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id: prestamo.id,
          Total: prestamo.total,
          Debt: prestamo.debt,
          Tax: prestamo.tax,
          ClientId: prestamo.clientId,
        }),
      });

      const updatedLoan = await resPrestamo.json();

      await AsyncStorage.setItem('cuentaPrestamo', cuenta.number);
      await AsyncStorage.setItem('clienteConPrestamos', JSON.stringify(cliente));

      Alert.alert('Pago exitoso', `Pago ${tipo} realizado por ₡${montoNum}`);
      router.back();
    } catch (err) {
      Alert.alert('Error', 'No se pudo completar el pago: ' + err.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Pago de Préstamo</Text>

      <Text style={{ marginBottom: 10 }}>Selecciona la cuenta:</Text>
      <FlatList
        data={cuentas}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCuentaSeleccionada(item.number)}
            style={{
              backgroundColor: cuentaSeleccionada === item.number ? '#1565C0' : '#f4f4f4',
              padding: 12,
              borderRadius: 8,
              marginBottom: 10
            }}
          >
            <Text style={{ color: cuentaSeleccionada === item.number ? '#fff' : '#000' }}>
              {item.type} - ₡{item.balance.toLocaleString()} ({item.currency})
            </Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 15 }}
      />

      <Text style={{ marginBottom: 5 }}>Tipo de pago:</Text>
      <Picker selectedValue={tipo} onValueChange={setTipo} style={{ marginBottom: 20 }}>
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Extraordinario (+₡10)" value="extraordinario" />
      </Picker>

      <TouchableOpacity
        onPress={handlePago}
        style={{ backgroundColor: '#1565C0', padding: 14, borderRadius: 10, marginTop: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#1565C0' }}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
