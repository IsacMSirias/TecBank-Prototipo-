import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Dashboard.css"; // Asegúrate de tener este archivo de estilos

function Dashboard() {
  const [showWelcomeText, setShowWelcomeText] = useState(true);

  const handleLinkClick = () => {
    setShowWelcomeText(false);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Barra Lateral */}
      <nav className="sidebar">
        <h2>TecBank</h2>
        <ul>
          <li>
            <Link to="/dashboard/cuentas" onClick={handleLinkClick}>
              Cuentas
            </Link>
          </li>
          <li>
            <Link to="/dashboard/tarjetas" onClick={handleLinkClick}>
              Tarjetas
            </Link>
          </li>
          <li>
            <Link to="/dashboard/prestamos" onClick={handleLinkClick}>
              Préstamos
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenedor principal con contenido centrado */}
      <div className="main-content">
        {showWelcomeText && (
          <div className="dashboard-welcome">
            <h1>Bienvenido a TecBank - Tu banco digital al alcance de tu mano</h1>
            <p>Al lado izquierdo verá las opciones a las cuales puede acceder.</p>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
