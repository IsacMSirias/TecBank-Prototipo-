import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Tarjetas() {
  const router = useRouter();
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTarjetas = () => {
    const numeroCuenta = sessionStorage.getItem('cuentaADebitar'); // Obtener número de cuenta desde sessionStorage
    console.log(`El número de cuenta es: ${numeroCuenta}`);

    if (!numeroCuenta) {
      setError('No se ha encontrado un número de cuenta');
      setLoading(false);
      return;
    }

    const url = `http://192.168.50.135:6969/api/Account/number/${numeroCuenta}`; // <--- IP actualizada

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de las tarjetas:", data);
        setTarjetas(data.cards || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTarjetas();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando tarjetas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (tarjetas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tienes tarjetas registradas.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Tarjetas</Text>

      <FlatList
        data={tarjetas}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              sessionStorage.setItem('tarjetaSeleccionada', item.number);
              router.push(`/tarjetas/pagos`);
            }}
            style={{
              backgroundColor: '#f4f4f4',
              padding: 16,
              borderRadius: 12,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
            <Text>{item.moneda === 'Colones' ? `₡${item.balance.toLocaleString()}` : `$${item.balance.toLocaleString()}`}</Text>
            <Text style={{ fontSize: 12 }}>N° {item.number}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
