// React
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

// Components

// Styling

function Advisors() {
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
      <h1>Gestión de Acesores</h1>
    </div>
  );
}

export default Advisors;