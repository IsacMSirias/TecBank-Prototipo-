import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function PagoTarjeta() {
  const [monto, setMonto] = useState('');
  const [tarjeta, setTarjeta] = useState(null);
  const [cuenta, setCuenta] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const numeroTarjeta = sessionStorage.getItem('tarjetaSeleccionada');
    const numeroCuenta = sessionStorage.getItem('cuentaADebitar');

    if (!numeroTarjeta || !numeroCuenta) {
      setError('No se ha seleccionado tarjeta o cuenta.');
      return;
    }

    fetch(`http://localhost:6969/api/Card/number/${numeroTarjeta}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener tarjeta');
        return res.json();
      })
      .then(setTarjeta)
      .catch((err) => setError(err.message));

    fetch(`http://localhost:6969/api/Account/number/${numeroCuenta}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener cuenta');
        return res.json();
      })
      .then(setCuenta)
      .catch((err) => setError(err.message));
  }, []);

  const handlePago = async () => {
    const montoNumerico = parseFloat(monto);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      Alert.alert('Monto inválido', 'Por favor ingrese un monto válido.');
      return;
    }

    if (montoNumerico > cuenta.balance) {
      Alert.alert('Error', 'El monto supera el balance de la cuenta.');
      return;
    }

    try {
      // Nuevos balances
      const nuevoBalanceCuenta = cuenta.balance - montoNumerico;
      const nuevoBalanceTarjeta = tarjeta.balance + montoNumerico;

      // Actualizar cuenta
      await fetch(`http://localhost:6969/api/Account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cuenta,
          balance: nuevoBalanceCuenta
        }),
      });

      // Actualizar tarjeta
      await fetch(`http://localhost:6969/api/Card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tarjeta,
          balance: nuevoBalanceTarjeta
        }),
      });

      // Crear transacción en cuenta (retiro)
      await fetch(`http://localhost:6969/api/Transaction/account/${cuenta.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance: montoNumerico,
          date: new Date().toISOString(),
          type: 'retiro',
          description: `Pago a tarjeta ${tarjeta.number}`
        }),
      });

      // Crear transacción en tarjeta (depósito)
      await fetch(`http://localhost:6969/api/Transaction/card/${tarjeta.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance: montoNumerico,
          date: new Date().toISOString(),
          type: 'deposito',
          description: `Pago desde cuenta ${cuenta.number}`
        }),
      });

      Alert.alert('Pago realizado', `Se ha pagado ₡${montoNumerico.toLocaleString()}`);
      setMonto('');
      router.push('/tarjetas');

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Ocurrió un problema al procesar el pago.');
    }
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!tarjeta || !cuenta) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Pago de Tarjeta</Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>{tarjeta.type}</Text>
        <Text>{tarjeta.balance.toLocaleString()} - {tarjeta.currency}</Text>
        <Text style={{ fontSize: 12 }}>Tarjeta N° {tarjeta.number}</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>{cuenta.type}</Text>
        <Text>{cuenta.balance.toLocaleString()} - {cuenta.currency}</Text>
        <Text style={{ fontSize: 12 }}>Cuenta N° {cuenta.number}</Text>
      </View>

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={handlePago}
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
