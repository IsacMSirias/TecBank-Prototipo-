// React
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import { goTo } from "../../utils";

// Styling

function Home() {
  const navigate = useNavigate();

  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  /*
  const goTo = (e, url) => {
    e.preventDefault();
    navigate(url, {state:{username: username}});
  }
  */

  return (
    <div className="standard-wrapper">
      <h1>Registrado como: {username}</h1>
      <main>
        <h1>Página de inicio</h1>
        <button onClick={(e) => goTo(e, navigate, "/clientes", username)}>
          Gestionar Clientes
        </button>
        <button onClick={(e) => goTo(e, navigate, "/cuentas", username)}>
          Gestionar Cuentas
        </button>
        <button onClick={(e) => goTo(e, navigate, "/tarjetas", username)}>
          Gestionar Tarjetas
        </button>
        <button onClick={(e) => goTo(e, navigate, "/asesores", username)}>
          Gestión de Asesores
        </button>
        <button onClick={(e) => goTo(e, navigate, "/prestamos", username)}>
          Gestionar Préstamos
        </button>
        <button onClick={(e) => goTo(e, navigate, "/moras", username)}>
          Gestionar Moras
        </button>
      </main>
    </div>
  );
}

export default Home;