// React
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { goTo } from "../../utils";

// Components

// Styling

function Accounts() {
  const navigate = useNavigate();

  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const searchByClientId = () => {
    /*
    {
    ...
    }
    */
  }

  const searchByAccountNumber = () => {
    /*
    {
    ...
    }
    */
  }

  // *Lista con los matches de la DB despues de hacer la búsqueda*
  const accounts = [
    {
      accountId: 4371892741,
      accountDesc: "Cuenta pagos servicios",
      accountCurrency: "CRC",
      accountBalance: 213112.12,
      accountType: "Ahorros",
      accountClientId: "0-0000-0000",
      accountClientName: "John"
    },
    {
      accountId: 4371892241,
      accountDesc: "Cuenta tarjeta crédito",
      accountCurrency: "CRC",
      accountBalance: 1349200.67,
      accountType: "Corriente",
      accountClientId: "0-0000-0000",
      accountClientName: "Gabo (no se cuál)"
    },
  ]

  return (
    <div className="standard-wrapper">
      <main style={{minWidth: '30vw'}}>
        <h1>Gestión de Cuentas</h1>        
        <button onClick={(e) => goTo(e, navigate, "/cuentas/registrar")}>
          Agregar
        </button>
        <h3>Búsqueda por número de cuenta</h3>
        <span><input type="text" placeholder="Número de Cuenta"/> <button>Buscar</button></span>
        <h3>Búsqueda por cliente</h3>
        <span><input type="text" placeholder="No. Ced. Cliente"/> <button>Buscar</button></span>
      </main>
      <main style={{minWidth: '50vw'}}>
        <h2>Coincidencias:</h2>
        <table>
          <thead>
            <tr>
              <th>No. Cuenta</th>
              <th>Cliente</th>
              <th>Ced. Cliente</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountId}>
                <td><button onClick={(e) => goTo(e, navigate, "/cuentas/consultar/id="+account.accountId, account)}>{account.accountId}</button></td>
                <td>{account.accountClientName}</td>
                <td>{account.accountClientId}</td>
                <td>{account.accountType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Accounts;