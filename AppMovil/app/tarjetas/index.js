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

    const url = `http://localhost:6969/api/Account/number/${numeroCuenta}`; // API para obtener las tarjetas asociadas a la cuenta

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de las tarjetas:", data);
        setTarjetas(data.cards || []); // Se asume que la respuesta contiene un campo "tarjetas"
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
        keyExtractor={(item) => item.number.toString()} // Usamos el número de tarjeta como clave
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              sessionStorage.setItem('tarjetaSeleccionada', item.number); // Guardamos el número de tarjeta en sessionStorage
              router.push(`/tarjetas/pagotarjeta`); // Navegamos al detalle de la tarjeta
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
