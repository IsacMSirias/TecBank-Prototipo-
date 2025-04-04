// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button"

// Styling
import "./Login.css"; // Asegúrate de tener este archivo de estilos

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Usuario:", username, "Contraseña:", password);
    
    // Aquí puedes agregar la lógica de autenticación
    // Por ahora, simplemente redirige al dashboard
    navigate("/dashboard", {state:{username: username}});
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bienvenido a TecBank</h2>
        <p>Inicia sesión para acceder a tu cuenta</p>

        <form onSubmit={handleLogin}>
          <TextInput
            className="text-input-standard"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextInput
            className="text-input-standard"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            className="button-standard"
            type="submit"
            text="Ingresar"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
