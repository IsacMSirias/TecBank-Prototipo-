// React
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateValue } from "../../utils";

// Components

// Styling

function AccountCreation() {
  // Atributos modificables al crear cuenta
  const [accountClientId, setAccountClientId] = useState('');
  const [accountDesc, setAccountDesc] = useState('');
  const [accountCurrency, setAccountCurrency] = useState('');
  const [accountType, setAccountType] = useState('');

  // Hacer un request para intentar crear la cuenta
  const requestAccountCreation = (e, accountClientId, accountDesc, accountCurrency, accountType) => {
    e.preventDefault();

    if (accountCurrency != "" && accountType != "") {
      
      /*
      Consultar al API, leer el request status code y alertar del estado (p. ej., Exito, Fallo, Cliente no existe)
      {
        ...
      }
      */
      
      // Aviso provisional para ver que los datos se envíen
      alert(`Intento de creación de cuenta:\nCed. Cliente: ${accountClientId}\nDescripción: ${accountDesc}\nMoneda: ${accountCurrency}\nTipo: ${accountType}`);
    } else {
      alert(`Por favor verifique que los valores introducidos sean válidos`);
    }

  }

  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);
  
  return (
    <>
      <div className="standard-wrapper">
        <main>
          <h1>Registro de Nuevas Cuentas</h1>
          <form onSubmit={(e) => requestAccountCreation(e, accountClientId, accountDesc, accountCurrency, accountType)}>
            <span>
              <span>
                Ced. Cliente
              </span> 
              <input 
                type="text" 
                value={accountClientId} 
                onChange={(event) => updateValue(setAccountClientId, event)}
                required
              />
            </span>
            <span>
              <span>
                Descripción
              </span> 
              <input 
                type="text"
                value={accountDesc}
                onChange={(event) => updateValue(setAccountDesc, event)}
                required
              />
            </span>
            <span>
              <span>
                Moneda
              </span> 
              <select 
                value={accountCurrency} 
                onChange={(event) => updateValue(setAccountCurrency, event)}
              >
                <option 
                  value={null}
                >
                  Seleccione...
                </option>  
                <option 
                  value="CRC"
                >
                  CRC
                </option>  
                <option 
                  value="USD"
                >
                  USD
                </option>  
              </select>
            </span>
            <span>
              <span>
                Tipo
              </span>
              <select 
                value={accountType} 
                onChange={(event) => updateValue(setAccountType, event)}
              >
                <option 
                  value={null}
                >
                  Seleccione...
                </option>
                <option 
                  value="Corriente"
                >
                  Corriente
                </option>  
                <option 
                  value="Ahorros"
                >
                  Ahorros
                </option>  
              </select>
            </span>
            <button
              type="submit"
            >
              Crear cuenta
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default AccountCreation;
