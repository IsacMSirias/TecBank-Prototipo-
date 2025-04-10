// React
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Components

// Styling

function AccountOverview() {
  // Location para mantener información entre páginas
  const location = useLocation();
  
   // Extraer datos del location.state
  const {
    currentUsername,
    accountId,
    accountDesc,
    accountCurrency,
    accountBalance,
    accountType,
    accountClientId,
    accountClientName
  } = location.state || {};

  // Estados locales
  const [username, setUsername] = useState(currentUsername);
  const [balance, setBalance] = useState(accountBalance || 0);
  const [clientId, setClientId] = useState(accountClientId || "");
  const [desc, setDesc] = useState(accountDesc || "");
  const [type, setType] = useState(accountType || "");
  const [currency, setCurrency] = useState(accountCurrency || "");
  const [clientName, setClientName] = useState(accountClientName || "");
  const [id, setId] = useState(accountId || "");

  useEffect(() => {
    if (location.state) {
      setUsername(location.state.username || "");
      setBalance(location.state.accountBalance || 0);
      setClientId(location.state.accountClientId || "");
      setDesc(location.state.accountDesc || "");
      setType(location.state.accountType || "");
      setCurrency(location.state.accountCurrency || "");
      setClientName(location.state.accountClientName || "");
      setId(location.state.accountId || "");
    }
  }, [location.state]);

  const updateAccount = (e) => {
    e.preventDefault();
    /* API Request del cambio de datos
    {
      ...
    }
    */
  }

  const deleteAccount = (e) => {
    e.preventDefault();
    /* API Request del delete (lógico) de la cuenta
    {
      ...
    }
    */
  }

  return (
    <div className="standard-wrapper">
      <main>
        <table>
          <thead>
            <tr>
              <th><strong>No. Cuenta</strong></th>
              <th><strong>Descrip.*</strong></th>
              <th><strong>Moneda</strong></th>
              <th><strong>Saldo*</strong></th>
              <th><strong>Tipo*</strong></th>
              <th><strong>Ced. Cliente*</strong></th>
              <th><strong>Cliente</strong></th>
            </tr>
          </thead>  
          <tbody>
            <tr>
              <td className="--fixed-value">{id}</td>
              <td><input className="--modifiable-value" type="text" placeholder={desc}/></td>
              <td className="--fixed-value">{currency}</td>
              <td><input className="--modifiable-value" type="number" placeholder={balance}/></td>
              <td><input className="--modifiable-value" type="text" placeholder={type}/></td>
              <td><input className="--modifiable-value" type="text" placeholder={clientId}/></td>
              <td className="--fixed-value">{clientName}</td>
            </tr>
          </tbody>
        </table>
        </main>
        <main>
        <button onClick={updateAccount}>Ver Movimientos</button>
        <button onClick={updateAccount}>Actualizar Datos</button>
        <button className="--dangerous" onClick={deleteAccount}>Borrar Cuenta</button>
      </main>   
    </div>
  );
}

export default AccountOverview;