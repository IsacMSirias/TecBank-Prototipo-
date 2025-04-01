import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Asegúrate de tener este archivo de estilos

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Usuario:", username, "Contraseña:", password);
    
    // Aquí puedes agregar la lógica de autenticación
    // Por ahora, simplemente redirige al dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bienvenido a TecBank</h2>
        <p>Inicia sesión para acceder a tu cuenta</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
