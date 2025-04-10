// React
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Components

// Styling

function Clients() {
  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  return (
    <div className="standard-wrapper">
      <h1>Gestión de Clientes</h1>
    </div>
  );
}

export default Clients;