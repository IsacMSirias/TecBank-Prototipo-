import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../layouts/Dashboard";
import Cuentas from "../pages/Cuentas";
import Tarjetas from "../pages/Tarjetas";
import Prestamos from "../pages/Prestamos";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="cuentas" element={<Cuentas />} />
          <Route path="tarjetas" element={<Tarjetas />} />
          <Route path="prestamos" element={<Prestamos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
