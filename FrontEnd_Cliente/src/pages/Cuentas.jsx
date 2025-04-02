import React, { useState } from "react";
import "../styles/Cuentas.css"; // Estilos específicos para Cuentas

const Cuentas = () => {
  const [cuenta, setCuenta] = useState("");
  const [titular, setTitular] = useState("");
  const [monto, setMonto] = useState("");

  const verMovimientos = () => {
    console.log("Mostrando movimientos de la cuenta...");
  };

  const realizarTransferencia = (e) => {
    e.preventDefault();
    console.log(
      `Transferencia realizada: Cuenta destino: ${cuenta}, Titular: ${titular}, Monto: ${monto}`
    );
  };

  return (
    <div className="cuentas-container">
      <h2>Cuentas</h2>
      <button onClick={verMovimientos}>Ver Movimientos</button>

      <h3>Realizar Transferencia</h3>
      <form onSubmit={realizarTransferencia}>
        <input
          type="text"
          placeholder="Cuenta destino"
          value={cuenta}
          onChange={(e) => setCuenta(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Titular"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
        <button type="submit">Transferir</button>
      </form>
    </div>
  );
};

export default Cuentas;
