// React
import React, { useState } from "react";

// Components
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

// Styling
import "./Accounts.css";

function Accounts() {
  const [account, setAccount] = useState("");
  const [holder, setHolder] = useState("");
  const [amount, setAmount] = useState("");

  const viewTransactions = () => {
    console.log("Mostrando movimientos de la cuenta...");
  };

  const makeMoneyTransfer = (e) => {
    e.preventDefault();
    console.log(
      `Transferencia realizada: Cuenta destino: ${account}, Titular: ${holder}, Monto: ${amount}`
    );
  };

  return (
    <div className="cuentas-container">
      <h2>Cuentas</h2>
      <Button
        className="button-primary"
        onClick={viewTransactions}
        text="Ver movimientos"
      />
      <h3>Realizar Transferencia</h3>
      <form onSubmit={makeMoneyTransfer}>
        <TextInput
          className="text-input-standard"
          type="text"
          placeholder="Cuenta destino"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
        <TextInput
          className="text-input-standard"
          type="text"
          placeholder="Titular"
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
          required
        />
        <TextInput
          className="text-input-standard"
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Button
          className="button-primary"
          type="submit"
          text="Transferir"
        />
      </form>
    </div>
  );
}

export default Accounts;
