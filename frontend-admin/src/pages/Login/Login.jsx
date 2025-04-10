// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { goTo } from "../../utils";

// Styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Introduzca sus credenciales</h1>
        <form onSubmit={(e) => goTo(e, navigate, "/inicio", {username: username})}>
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