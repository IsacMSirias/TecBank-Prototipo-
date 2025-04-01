import { Outlet, Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <nav>
        <Link to="/dashboard/cuentas">Cuentas</Link> | 
        <Link to="/dashboard/tarjetas">Tarjetas</Link> | 
        <Link to="/dashboard/prestamos">Préstamos</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default Dashboard;
