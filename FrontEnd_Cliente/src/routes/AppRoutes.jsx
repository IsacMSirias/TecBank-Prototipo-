// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Accounts from "../pages/Accounts/Accounts";
import Cards from "../pages/Cards/Cards";
import Loans from "../pages/Loans/Loans";
import Home from "../pages/Home/Home";

// Styling

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="cuentas" element={<Accounts />} />
          <Route path="tarjetas" element={<Cards />} />
          <Route path="prestamos" element={<Loans />} />
          <Route path="inicio" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
