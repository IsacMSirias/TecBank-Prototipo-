// React
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import AppLink from "../../components/AppLink/AppLink"

//Styling
import "./Dashboard.css";

function Dashboard() {
  const [showGuidingText, setShowGuidingText] = useState(true);

  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  // Ocultar texto de ayuda cuando se clickea un módulo del dashboard
  const handleLinkClick = () => {
    setShowGuidingText(false);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Barra Lateral */}
      <nav className="sidebar">
        <h2>
          TecBank
        </h2>
        <ul>
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/cuentas"
              onClick={handleLinkClick}
              text="Cuentas"
            />
          </li>
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/tarjetas"
              onClick={handleLinkClick}
              text="Tarjetas"
            />
          </li>
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/prestamos"
              onClick={handleLinkClick}
              text="Prestamos"
            />
          </li>
        </ul>
        <h4>
          Sesión iniciada como:<br/> 
          {username}
        </h4>
      </nav>

      {/* Contenedor principal con contenido centrado */}
      <div className="main-content">
        <div className="dashboard-welcome">
          <h1>TecBank - Tu banco digital al alcance de tu mano</h1>
        </div>
        {showGuidingText && (
          <div className="dashboard-welcome">
            <p>Al lado izquierdo verá las opciones a las cuales puede acceder.</p>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
