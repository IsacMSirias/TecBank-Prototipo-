import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      router.replace('/home'); // redirige al home después del login
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
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
