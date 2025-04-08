import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
  <Text style={styles.title}>Bienvenido a TecBank 🏦</Text>

  <Button title="Ver Cuentas" onPress={() => router.push('/cuentas')} />
  <Button title="Ver Tarjetas" onPress={() => router.push('/tarjetas')} />
  <Button title="Ver Trámites" onPress={() => router.push('/tramites')} />
  <Button title="Ver Préstamos" onPress={() => router.push('/prestamos')} />
  <Button title="Cerrar sesión" onPress={() => router.replace('/')} />
</ScrollView>
);
}

const styles = StyleSheet.create({
container: {
padding: 30,
flexGrow: 1,
justifyContent: 'center',
gap: 20,
},
title: {
fontSize: 26,
textAlign: 'center',
marginBottom: 30,
fontWeight: 'bold',
},
});