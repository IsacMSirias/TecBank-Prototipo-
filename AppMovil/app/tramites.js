import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default function Tramites() {
  const router = useRouter();
  const [cuentas, setCuentas] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      setLoading(true);
      try {
        const idCliente = sessionStorage.getItem('idCliente');
        if (!idCliente) {
          Alert.alert('Error', 'No se encontró el ID del cliente.');
          return;
        }

        // Paso 1: Obtener cliente con sus cuentas
        const resCliente = await fetch(`http://192.168.50.135:6969/api/Client/${idCliente}`); // IP actualizada
        if (!resCliente.ok) {
          const error = await resCliente.json();
          Alert.alert('Error al obtener cliente', error.value || 'Error desconocido');
          return;
        }

        const cliente = await resCliente.json();
        const cuentasCliente = cliente.accounts || [];

        // Paso 2: Obtener cada cuenta completa y sacar sus transacciones
        const cuentasConTransacciones = await Promise.all(
          cuentasCliente.map(async (cuenta) => {
            const resCuenta = await fetch(`http://192.168.50.135:6969/api/Account/number/${cuenta.number}`); // IP actualizada
            if (!resCuenta.ok) return null;

            const cuentaCompleta = await resCuenta.json();
            const transaccionesCuenta = cuentaCompleta.transactions || [];
            return { ...cuentaCompleta, transacciones: transaccionesCuenta };
          })
        );

        setCuentas(cuentasConTransacciones.filter(Boolean)); // quitar posibles nulls

        // Paso 3: Obtener tarjetas con sus transacciones
        const tarjetasTotales = [];
        for (const cuenta of cuentasCliente) {
          const resTarjetas = await fetch(`http://192.168.50.135:6969/api/Card/account/${cuenta.number}`); // IP actualizada
          if (resTarjetas.ok) {
            const tarjetas = await resTarjetas.json();
            for (const tarjeta of tarjetas) {
              const resTarjeta = await fetch(`http://192.168.50.135:6969/api/Card/number/${tarjeta.number}`); // IP actualizada
              if (!resTarjeta.ok) continue;

              const tarjetaCompleta = await resTarjeta.json();
              const transaccionesTarjeta = tarjetaCompleta.transactions || [];

              tarjetasTotales.push({ ...tarjetaCompleta, transacciones: transaccionesTarjeta });
            }
          }
        }

        setTarjetas(tarjetasTotales);
      } catch (error) {
        console.error('Error general:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Menú Principal 🏦
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1565C0" />
      ) : (
        <>
          {/* Sección de Tarjetas */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Tarjetas</Text>
          {tarjetas.length === 0 && <Text>No tienes tarjetas registradas.</Text>}
          {tarjetas.map((tarjeta) => (
            <View key={tarjeta.number} style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Tarjeta {tarjeta.number}</Text>
              {tarjeta.transacciones.length > 0 ? (
                tarjeta.transacciones.map((tran, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#e0f2f1',
                      padding: 10,
                      borderRadius: 8,
                      marginTop: 5,
                    }}
                  >
                    <Text>Tipo: {tran.type}</Text>
                    <Text>Monto: ₡{tran.balance?.toLocaleString()}</Text>
                    <Text>Fecha: {new Date(tran.date).toLocaleDateString()}</Text>
                  </View>
                ))
              ) : (
                <Text>No hay transacciones disponibles.</Text>
              )}
            </View>
          ))}

          {/* Sección de Cuentas */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Cuentas</Text>
          {cuentas.length === 0 && <Text>No tienes cuentas registradas.</Text>}
          {cuentas.map((cuenta) => (
            <View key={cuenta.number} style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Cuenta {cuenta.number}</Text>
              {cuenta.transacciones.length > 0 ? (
                cuenta.transacciones.map((tran, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#e3f2fd',
                      padding: 10,
                      borderRadius: 8,
                      marginTop: 5,
                    }}
                  >
                    <Text>Tipo: {tran.type}</Text>
                    <Text>Monto: ₡{tran.balance?.toLocaleString()}</Text>
                    <Text>Fecha: {new Date(tran.date).toLocaleDateString()}</Text>
                  </View>
                ))
              ) : (
                <Text>No hay transacciones disponibles.</Text>
              )}
            </View>
          ))}

          {/* Botón de volver */}
          <TouchableOpacity
            onPress={() => router.replace('/home')}
            style={{
              marginTop: 30,
              backgroundColor: '#1565C0',
              padding: 16,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Volver a inicio</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
