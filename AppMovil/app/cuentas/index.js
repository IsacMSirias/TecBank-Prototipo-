import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const cuentas = [
  { numero: '123456789', saldo: 150000, tipo: 'Ahorros', moneda: 'Colones' },
  { numero: '987654321', saldo: 500.50, tipo: 'Corriente', moneda: 'Dólares' },
];

export default function Cuentas() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mis Cuentas</Text>

      <FlatList
        data={cuentas}
        keyExtractor={(item) => item.numero}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/cuentas/${item.numero}`)}
            style={{
              backgroundColor: '#f4f4f4',
              padding: 16,
              borderRadius: 12,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.tipo}</Text>
            <Text>₡{item.saldo.toLocaleString()} - {item.moneda}</Text>
            <Text style={{ fontSize: 12 }}>N° {item.numero}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
