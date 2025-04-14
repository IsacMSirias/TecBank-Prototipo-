import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({
    clientId: "",
    total: "",
    tax: "",
    debt: ""
  });
  const [editing, setEditing] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Variables de búsqueda
  const [loanIdSearch, setLoanIdSearch] = useState("");
  const [clientIdSearch, setClientIdSearch] = useState("");

  // Cargar los préstamos cuando se monta el componente
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setLoans(res.data))
      .catch(err => console.error(err));
  }, []);

  // Función para buscar por ID de préstamo
  const searchByLoanId = () => {
    if (!loanIdSearch) return alert("Por favor ingrese un ID de préstamo");

    axios.get(`${API_URL}/api/Loan/${loanIdSearch}`)
      .then(res => setLoans([res.data]))
      .catch(err => {
        alert("No se encontró el préstamo.");
        setLoans([]);
      });
  };

  // Función para buscar por ID de cliente
  const searchByClientId = () => {
    if (!clientIdSearch) return alert("Por favor ingrese un ID de cliente");

    axios.get(`${API_URL}/api/Loan?clientId=${clientIdSearch}`)
      .then(res => setLoans(res.data))
      .catch(err => {
        alert("No se encontraron préstamos para este cliente.");
        setLoans([]);
      });
  };

  // Crear un nuevo préstamo
  const handleCreate = () => {
    const newLoanData = {
      total: parseFloat(newLoan.total),
      debt: parseFloat(newLoan.debt),
      tax: parseFloat(newLoan.tax),
      clientId: parseInt(newLoan.clientId)
    };

    axios.post(API_URL, newLoanData)
      .then(res => {
        setLoans([...loans, res.data.value]);
        setShowNewModal(false);
        setNewLoan({ clientId: "", total: "", tax: "", debt: "" });
      })
      .catch(err => console.error(err));
  };

  // Actualizar un préstamo existente
  const handleUpdate = () => {
    const updatedLoan = {
      id: editing.id,
      total: parseFloat(editing.total),
      debt: parseFloat(editing.debt),
      tax: parseFloat(editing.tax),
      clientId: parseInt(editing.clientId)
    };

    axios.post(API_URL, updatedLoan)
      .then(res => {
        setLoans(loans.map(l => l.id === updatedLoan.id ? res.data.value : l));
        setShowEditModal(false);
      })
      .catch(err => console.error(err));
  };

  // Eliminar un préstamo
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/api/Loan/${id}`)
      .then(() => setLoans(loans.filter(l => l.id !== id)))
      .catch(err => console.error(err));
  };

  // Editar un préstamo
  const handleEdit = (loan) => {
    setEditing(loan);
    setShowEditModal(true);
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Préstamos</h1>

        <button onClick={() => setShowNewModal(true)}>Nuevo Préstamo</button>

        {/* Barras de búsqueda */}
        <h3>Búsqueda por ID de préstamo</h3>
        <span>
          <input
            type="text"
            placeholder="ID de Préstamo"
            value={loanIdSearch}
            onChange={(e) => setLoanIdSearch(e.target.value)}
          />
          <button onClick={searchByLoanId}>Buscar</button>
        </span>

        <h3>Búsqueda por ID de cliente</h3>
        <span>
          <input
            type="text"
            placeholder="ID de Cliente"
            value={clientIdSearch}
            onChange={(e) => setClientIdSearch(e.target.value)}
          />
          <button onClick={searchByClientId}>Buscar</button>
        </span>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Saldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.clientId}</td>
                <td>{loan.total}</td>
                <td>{loan.debt}</td>
                <td>
                  <button onClick={() => handleEdit(loan)}>Editar</button>
                  <button className="--dangerous" onClick={() => handleDelete(loan.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal NUEVO Préstamo */}
        {showNewModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Agregar Nuevo Préstamo</h2>
              {Object.entries(newLoan).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "total" || key === "tax" || key === "debt" ? "number" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) =>
                    setNewLoan({ ...newLoan, [key]: e.target.value })
                  }
                />
              ))}
              <button onClick={handleCreate}>Guardar</button>
              <button className="--dangerous" onClick={() => setShowNewModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Modal EDITAR Préstamo */}
        {showEditModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Editar Préstamo</h2>
              {editing && Object.entries(editing).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "total" || key === "tax" || key === "debt" ? "number" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) =>
                    setEditing({ ...editing, [key]: e.target.value })
                  }
                />
              ))}
              <button onClick={handleUpdate}>Guardar</button>
              <button className="--dangerous" onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Loans;
