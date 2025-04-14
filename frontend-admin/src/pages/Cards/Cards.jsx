import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {API_URL} from "../../utils";

function Cards() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username || "");

  const [cards, setCards] = useState([]);
  const [numberSearch, setNumberSearch] = useState("");
  const [clientIdSearch, setClientIdSearch] = useState("");
  const [accountNumberSearch, setAccountNumberSearch] = useState(""); // Para búsqueda por número de cuenta

  const [newCard, setNewCard] = useState({
    number: "",
    type: "Débito",
    dueDate: "",
    ccv: "",
    balance: 0,
    accountId: "",
  });

  const [editingCard, setEditingCard] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  // Función para buscar por número de tarjeta
  const searchByCardNumber = async () => {
    if (!numberSearch) return alert("Por favor ingrese un número de tarjeta");

    try {
      const res = await axios.get(`${API_URL}/api/Card/number/${numberSearch}`);
      const card = res.data;

      setCards([card]);
    } catch (err) {
      alert("Error: " + err.message);
      setCards([]);
    }
  };


  // Función para buscar por número de cuenta
  const searchByAccountNumber = async () => {
    if (!accountNumberSearch) return alert("Por favor ingrese un número de cuenta");

    try {
      const res = await axios.get(`${API_URL}/api/Account/number/${accountNumberSearch}`);
      const account = res.data;

      if (!account.cards || account.cards.length === 0) {
        alert("No se encontraron tarjetas asociadas a esa cuenta.");
        setCards([]);
        return;
      }

      setCards(account.cards);
    } catch (err) {
      alert("Error: " + err.message);
      setCards([]);
    }
  };

  // Función para crear una nueva tarjeta
  const handleCreate = async () => {
    try {
      const payload = {
        CCV: parseInt(newCard.ccv),
        Balance: parseFloat(newCard.balance),
        DueDate: newCard.dueDate,
        Number: newCard.number,
        Type: newCard.type,
        AccountId: parseInt(newCard.accountId),
      };
      await axios.post(`${API_URL}/api/Card`, payload);
      setShowNewModal(false);
      setNewCard({
        number: "",
        type: "Débito",
        dueDate: "",
        ccv: "",
        balance: 0,
        accountId: "",
      });
      setCards((prev) => [...prev, payload]); // Opcional: o recargar desde API
    } catch (err) {
      console.error("Error creando tarjeta:", err);
    }
  };

  // Función para eliminar una tarjeta
  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`${API_URL}/api/Card?id=${cardId}`);
      setCards((prev) => prev.filter((c) => (c.id || c.Id) !== cardId));
    } catch (err) {
      console.error("Error eliminando tarjeta:", err);
    }
  };

  // Función para editar una tarjeta
  const handleEdit = (card) => {
    setEditingCard({
      ...card,
      ccv: card.ccv || card.CCV,
      balance: card.balance || card.Balance,
      dueDate: card.dueDate || card.DueDate,
      number: card.number || card.Number,
      type: card.type || card.Type,
      accountId: card.accountId || card.AccountId,
    });
    setShowEditModal(true);
  };

  // Función para actualizar una tarjeta
  const handleUpdate = async () => {
    try {
      const payload = {
        Id: editingCard.id || editingCard.Id,
        CCV: parseInt(editingCard.ccv),
        Balance: parseFloat(editingCard.balance),
        DueDate: editingCard.dueDate,
        Number: editingCard.number,
        Type: editingCard.type,
        AccountId: parseInt(editingCard.accountId),
      };
      await axios.post(`${API_URL}/api/Card`, payload);
      setShowEditModal(false);
      setEditingCard(null);
      // Refresh
      searchByClientId();
    } catch (err) {
      console.error("Error actualizando tarjeta:", err);
    }
  };

  return (
    <div className="standard-wrapper">
      <main style={{ minWidth: "30vw" }}>
        <h1>Gestión de Tarjetas</h1>
        <button onClick={() => setShowNewModal(true)}>Agregar Tarjeta</button>

        <h3>Búsqueda por número de tarjeta</h3>
        <span>
          <input
            type="text"
            placeholder="Número de Tarjeta"
            value={numberSearch}
            onChange={(e) => setNumberSearch(e.target.value)}
          />{" "}
          <button onClick={searchByCardNumber}>Buscar</button>
        </span>

 

        <h3>Búsqueda por número de cuenta</h3>
        <span>
          <input
            type="text"
            placeholder="Número de cuenta"
            value={accountNumberSearch}
            onChange={(e) => setAccountNumberSearch(e.target.value)}
          />{" "}
          <button onClick={searchByAccountNumber}>Buscar</button>
        </span>
      </main>

      <main style={{ minWidth: "50vw" }}>
        <h2>Tarjetas Encontradas:</h2>
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Tipo</th>
              <th>Vencimiento</th>
              <th>Saldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, index) => (
              <tr key={index}>
                <td>{card.number || card.Number}</td>
                <td>{card.type || card.Type}</td>
                <td>{card.dueDate || card.DueDate}</td>
                <td>{card.balance || card.Balance}</td>
                <td>
                  <button onClick={() => handleEdit(card)}>Editar</button>
                  <button
                    className="--dangerous"
                    onClick={() => handleDelete(card.id || card.Id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal de edición */}
      {showEditModal && editingCard && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Tarjeta</h2>
            <label>Número de tarjeta</label>
            <input
              type="text"
              value={editingCard.number}
              onChange={(e) => setEditingCard({ ...editingCard, number: e.target.value })}
            />
            <label>Tipo</label>
            <input
              type="text"
              value={editingCard.type}
              onChange={(e) => setEditingCard({ ...editingCard, type: e.target.value })}
            />
            <label>Vencimiento</label>
            <input
              type="date"
              value={editingCard.dueDate}
              onChange={(e) => setEditingCard({ ...editingCard, dueDate: e.target.value })}
            />
            <label>CCV</label>
            <input
              type="number"
              value={editingCard.ccv}
              onChange={(e) => setEditingCard({ ...editingCard, ccv: e.target.value })}
            />
            <label>Saldo</label>
            <input
              type="number"
              value={editingCard.balance}
              onChange={(e) => setEditingCard({ ...editingCard, balance: e.target.value })}
            />
            <button onClick={handleUpdate}>Actualizar</button>
            <button onClick={() => setShowEditModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
