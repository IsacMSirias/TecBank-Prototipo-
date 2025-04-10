// React
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Components

// Styling

function Roles() {
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
      <main>
        <h1>Gestión de Roles</h1>
      </main>
    </div>
  );
}

export default Roles;