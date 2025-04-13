// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const url = "http://localhost:6969/api";

  const login = () => {
    const loginUrl = `${url}/Client?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    fetch(loginUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.username || data.password !== password) {
        alert('Usuario o contraseña incorrectos');
      } else {
        sessionStorage.setItem('idCliente', data.id);
        console.log(`El id guardado es: ${data.id}`);
        navigate("/inicio", {
          state: {
            username: data.username,
            idCliente: data.id
          }
        });
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      alert('Usuario no encontrado.');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      login();
    } else {
      alert('Por favor ingrese correo y contraseña');
    }
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Introduzca sus credenciales</h1>
        <form onSubmit={handleSubmit}>
          <input 
            id="admin-login-username-input"
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            id="admin-login-password-input"
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            Ingresar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;