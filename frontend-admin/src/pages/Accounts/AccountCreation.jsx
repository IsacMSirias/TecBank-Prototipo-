// React
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateValue } from "../../utils";

function AccountCreation() {
  const [accountClientId, setAccountClientId] = useState('');
  const [accountDesc, setAccountDesc] = useState('');
  const [accountCurrency, setAccountCurrency] = useState('');
  const [accountType, setAccountType] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const requestAccountCreation = async (e) => {
    e.preventDefault();

    if (accountCurrency && accountType && accountClientId && accountDesc) {
      const newAccount = {
        clientId: accountClientId,
        description: accountDesc,
        currency: accountCurrency,
        type: accountType,
        balance: 0 // saldo inicial
      };

      try {
        const response = await fetch("http://localhost:6969/api/accounts/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });

        if (response.ok) {
          alert("Cuenta creada con éxito");
          navigate(-1); // volver atrás
        } else {
          const errorText = await response.text();
          alert(`Error al crear la cuenta: ${errorText}`);
        }
      } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor");
      }
    } else {
      alert("Por favor verifique que los valores introducidos sean válidos.");
    }
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Registro de Nuevas Cuentas</h1>
        <form onSubmit={requestAccountCreation}>
          <span>
            <span>Ced. Cliente</span> 
            <input 
              type="text" 
              value={accountClientId} 
              onChange={(event) => updateValue(setAccountClientId, event)}
              required
            />
          </span>
          <span>
            <span>Descripción</span> 
            <input 
              type="text"
              value={accountDesc}
              onChange={(event) => updateValue(setAccountDesc, event)}
              required
            />
          </span>
          <span>
            <span>Moneda</span> 
            <select 
              value={accountCurrency} 
              onChange={(event) => updateValue(setAccountCurrency, event)}
              required
            >
              <option value="">Seleccione...</option>  
              <option value="CRC">CRC</option>  
              <option value="USD">USD</option>  
            </select>
          </span>
          <span>
            <span>Tipo</span>
            <select 
              value={accountType} 
              onChange={(event) => updateValue(setAccountType, event)}
              required
            >
              <option value="">Seleccione...</option>
              <option value="Corriente">Corriente</option>  
              <option value="Ahorros">Ahorros</option>  
            </select>
          </span>
          <button type="submit">Crear cuenta</button>
        </form>
      </main>
    </div>
  );
}

export default AccountCreation;
