import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchPrestamos = () => {
    const idCliente = sessionStorage.getItem('idCliente');
    console.log(`El ID del cliente es: ${idCliente}`);

    if (!idCliente) {
      setError('No se encontró el ID del cliente.');
      setLoading(false);
      return;
    }

    const url = `http://localhost:6969/api/Client/${idCliente}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((cliente) => {
        console.log('Respuesta del cliente con préstamos:', cliente);
        setPrestamos(cliente.loans || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando préstamos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  if (prestamos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tienes préstamos registrados.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Préstamos</Text>

      <FlatList
        data={prestamos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              sessionStorage.setItem('prestamoASeleccionar', item.id.toString());
              router.push('/prestamos/pagoprestamo');
            }}
            style={{ backgroundColor: '#eee', padding: 16, borderRadius: 10, marginBottom: 15 }}
          >
            <Text style={{ fontWeight: 'bold' }}>Monto: ₡{item.total.toLocaleString()}</Text>
            <Text>Saldo pendiente: ₡{item.debt.toLocaleString()}</Text>
            <Text>Interés: {item.tax}%</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
