import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = "http://10.10.10.30:6969/api";  // IP local

  const login = async () => {
    const loginUrl = `${url}/Client?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(loginUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.username || data.password !== password) {
        alert('Usuario o contraseña incorrectos');
      } else {
        await AsyncStorage.setItem('idCliente', String(data.id));  // Guarda el idCliente
        console.log(`El id guardado es: ${data.id}`);
        router.replace('/home');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Usuario no encontrado.');
    }
  };

  const handleLogin = () => {
    if (username && password) {
      login();
    } else {
      alert('Por favor ingrese correo y contraseña');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
        TecBank
      </Text>

      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 15 }}
      />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={handleLogin}
        style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#1565C0',
          padding: 14,
          borderRadius: 10,
          marginTop: 25,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
