// React
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components

function AccountOverview() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [username, setUsername] = useState(currentUsername);
  const [balance, setBalance] = useState(accountBalance || 0);
  const [clientId, setClientId] = useState(accountClientId || "");
  const [desc, setDesc] = useState(accountDesc || "");
  const [type, setType] = useState(accountType || "");
  const [currency, setCurrency] = useState(accountCurrency || "");
  const [clientName, setClientName] = useState(accountClientName || "");
  const [id, setId] = useState(accountId || "");

  // Nuevos valores para editar
  const [newDesc, setNewDesc] = useState("");
  const [balanceChange, setBalanceChange] = useState(0);
  const [newType, setNewType] = useState("");
  const [newClientId, setNewClientId] = useState("");

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

  const updateAccount = async (e) => {
    e.preventDefault();

    const updatedAccount = {
      id,
      description: newDesc || desc,
      balance: balance + parseFloat(balanceChange),
      currency,
      type: newType || type,
      clientId: newClientId || clientId,
    };

    try {
      const response = await fetch(`http://192.168.50.135:6969/api/Account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAccount),
      });

      if (response.ok) {
        alert("Cuenta actualizada con éxito");
        navigate(-1); // volver atrás
      } else {
        alert("Error al actualizar cuenta");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.50.135:6969/api/Account/?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Cuenta eliminada correctamente");
        navigate(-1);
      } else {
        alert("Error al eliminar la cuenta");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

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
              <td>{id}</td>
              <td>{desc}</td>
              <td>{currency}</td>
              <td>{balance}</td>
              <td>{type}</td>
              <td>{clientId}</td>
              <td>{clientName}</td>
            </tr>
            <tr>
              <td>---</td>
              <td>
                <input
                  className="--modifiable-value"
                  type="text"
                  placeholder="Nueva desc."
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </td>
              <td>---</td>
              <td>
                <input
                  className="--modifiable-value"
                  type="number"
                  placeholder="Monto (+ / -)"
                  onChange={(e) => setBalanceChange(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="--modifiable-value"
                  type="text"
                  placeholder={type}
                  onChange={(e) => setNewType(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="--modifiable-value"
                  type="text"
                  placeholder={clientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                />
              </td>
              <td>---</td>
            </tr>
          </tbody>
        </table>
      </main>
      <main>
        <button onClick={updateAccount}>Actualizar Datos</button>
        <button className="--dangerous" onClick={deleteAccount}>Borrar Cuenta</button>
      </main>   
    </div>
  );
}

export default AccountOverview;
