// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Roles from "../pages/Roles/Roles";
import Accounts from "../pages/Accounts/Accounts";
import AccountOverview from "../pages/Accounts/AccountOverview";
import AccountCreation from "../pages/Accounts/AccountCreation";
import Advisors from "../pages/Advisors/Advisors";
import Loans from "../pages/Loans/Loans";
import Clients from "../pages/Clients/Clients";
import Cards from "../pages/Cards/Cards";
import Moras from "../pages/Moras(no se como se traduce)/moras";

// Styling

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/inicio" element={<Home/>}/>
        <Route path="/roles" element={<Roles/>}/>
        <Route path="/clientes" element={<Clients/>}/>
        <Route path="/cuentas" element={<Accounts/>}/>
        <Route path="/cuentas/consultar/:accountN" element={<AccountOverview/>}/> 
        <Route path="/cuentas/registrar" element={<AccountCreation/>}/>
        <Route path="/tarjetas" element={<Cards/>}/>
        <Route path="/asesores" element={<Advisors/>}/>
        <Route path="/prestamos" element={<Loans/>}/>
        <Route path="/moras" element={<Moras />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
