import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Moras() {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");
  const [loanNumber, setLoanNumber] = useState("");
  
  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleGeneratePDF = () => {
    if (!loanNumber) {
      alert("Por favor, ingrese el número de préstamo.");
      return;
    }

    // TODO: Llamar al endpoint para generar el PDF
    console.log(`Generar PDF para las moras del préstamo: ${loanNumber}`);
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Moras</h1>

        <div>
          <h3>Ingrese el número de préstamo para generar el PDF de las moras:</h3>
          <input
            type="text"
            placeholder="Número de préstamo"
            value={loanNumber}
            onChange={(e) => setLoanNumber(e.target.value)}
          />
          <button onClick={handleGeneratePDF}>Generar PDF</button>
        </div>
      </main>
    </div>
  );
}

export default Moras;