// src/pages/Accounts.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { goTo } from "../../utils";

function Accounts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");
  const [numberSearch, setNumberSearch] = useState("");
  const [clientIdSearch, setClientIdSearch] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const searchByAccountNumber = async () => {
    if (!numberSearch) return alert("Por favor ingrese un número de cuenta");

    try {
      const res = await fetch(`http://localhost:6969/api/account/number/${numberSearch}`);
      if (!res.ok) throw new Error("Cuenta no encontrada");

      const account = await res.json();

      // Obtener cliente
      const clientRes = await fetch(`http://localhost:6969/api/clients/${account.clientId}`);
      const client = await clientRes.json();

      setAccounts([
        {
          accountId: account.id,
          accountDesc: account.description,
          accountCurrency: account.currency,
          accountBalance: account.balance,
          accountType: account.type,
          accountClientId: client.id,
          accountClientName: `${client.firstName} ${client.lastName}`,
        },
      ]);
    } catch (err) {
      alert("Error: " + err.message);
      setAccounts([]);
    }
  };

  const searchByClientId = async () => {
    if (!clientIdSearch) return alert("Por favor ingrese una cédula");

    try {
      const res = await fetch(`http://localhost:6969/api/clients/${clientIdSearch}`);
      if (!res.ok) throw new Error("Cliente no encontrado");

      const client = await res.json();

      const matches = client.accounts.map((account) => ({
        accountId: account.id,
        accountDesc: account.description,
        accountCurrency: account.currency,
        accountBalance: account.balance,
        accountType: account.type,
        accountClientId: client.id,
        accountClientName: `${client.firstName} ${client.lastName}`,
      }));

      setAccounts(matches);
    } catch (err) {
      alert("Error: " + err.message);
      setAccounts([]);
    }
  };

  return (
    <div className="standard-wrapper">
      <main style={{ minWidth: "30vw" }}>
        <h1>Gestión de Cuentas</h1>
        <button onClick={(e) => goTo(e, navigate, "/cuentas/registrar")}>
          Agregar
        </button>
        <h3>Búsqueda por número de cuenta</h3>
        <span>
          <input
            type="text"
            placeholder="Número de Cuenta"
            value={numberSearch}
            onChange={(e) => setNumberSearch(e.target.value)}
          />{" "}
          <button onClick={searchByAccountNumber}>Buscar</button>
        </span>
        <h3>Búsqueda por cliente</h3>
        <span>
          <input
            type="text"
            placeholder="Id Cliente"
            value={clientIdSearch}
            onChange={(e) => setClientIdSearch(e.target.value)}
          />{" "}
          <button onClick={searchByClientId}>Buscar</button>
        </span>
      </main>
      <main style={{ minWidth: "50vw" }}>
        <h2>Coincidencias:</h2>
        <table>
          <thead>
            <tr>
              <th>No. Cuenta</th>
              <th>Cliente</th>
              <th>Id Cliente</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountId}>
                <td>
                  <button
                    onClick={(e) =>
                      goTo(e, navigate, "/cuentas/consultar/id=" + account.accountId, account)
                    }
                  >
                    {account.accountId}
                  </button>
                </td>
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
