import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = "http://localhost:6969/api/data";

  const mostrarMensaje = () => {
    const exampleData = {
      id: 0,
      accountNumber: 123456789,
      clientName: email,  // Aquí se guarda el correo en lugar de un valor predeterminado
      balance: 1500.75
    };

    // Imprimir el objeto exampleData antes de enviarlo
    console.log('JSON a enviar:', JSON.stringify(exampleData));
    
    fetch(url, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exampleData),  
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json(); 
    })
    .then(data => {
      // Imprimir la respuesta que se recibe del servidor
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  };

  const handleLogin = () => {
    if (email && password) {
      router.replace('/home');
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
        onSubmitEditing={() => {
          mostrarMensaje();
          handleLogin();
        }}
        style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
      />

      <TouchableOpacity
        onPress={() => {
          mostrarMensaje();
          handleLogin();
        }}
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
