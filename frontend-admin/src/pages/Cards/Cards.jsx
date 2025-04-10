// React
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

// Components

// Styling

function Cards() {
  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  return (
    <div>
      <h1>Gestión de Tarjetas</h1>
    </div>
  );
}

export default Cards;