import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Cards() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username || "");

  const [cards, setCards] = useState([]);
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
    fetchCards();
  }, [location.state]);

  const fetchCards = async () => {
    try {
      // Por simplicidad, se obtienen todas las tarjetas de todas las cuentas (puedes ajustar esto a una cuenta específica si lo deseas)
      const res = await axios.get("http://localhost:6969/api/Card/account/1"); // cambiar número de cuenta si es necesario
      setCards(res.data);
    } catch (err) {
      console.error("Error obteniendo tarjetas:", err);
    }
  };

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
      await axios.post("http://localhost:6969/api/Card", payload);
      fetchCards();
      setShowNewModal(false);
      setNewCard({
        number: "",
        type: "Débito",
        dueDate: "",
        ccv: "",
        balance: 0,
        accountId: "",
      });
    } catch (err) {
      console.error("Error creando tarjeta:", err);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:6969/api/Card?id=${cardId}`);
      fetchCards();
    } catch (err) {
      console.error("Error eliminando tarjeta:", err);
    }
  };

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

  const handleUpdate = async () => {
    try {
      const payload = {
        Id: editingCard.id,
        CCV: parseInt(editingCard.ccv),
        Balance: parseFloat(editingCard.balance),
        DueDate: editingCard.dueDate,
        Number: editingCard.number,
        Type: editingCard.type,
        AccountId: parseInt(editingCard.accountId),
      };
      await axios.post("http://localhost:6969/api/Card", payload);
      fetchCards();
      setShowEditModal(false);
      setEditingCard(null);
    } catch (err) {
      console.error("Error actualizando tarjeta:", err);
    }
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Tarjetas</h1>

        <button onClick={() => setShowNewModal(true)}>Agregar Tarjeta</button>

        <table>
          <thead>
            <tr>
              <th>Número de Tarjeta</th>
              <th>Tipo</th>
              <th>Fecha Expiración</th>
              <th>Saldo Disponible</th>
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

        {/* Modal NUEVA Tarjeta */}
        {showNewModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Agregar Nueva Tarjeta</h2>
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
              />
              <select
                value={newCard.type}
                onChange={(e) =>
                  setNewCard({ ...newCard, type: e.target.value })
                }
              >
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
              </select>
              <input
                type="text"
                placeholder="Fecha Expiración"
                value={newCard.dueDate}
                onChange={(e) =>
                  setNewCard({ ...newCard, dueDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Código de Seguridad"
                value={newCard.ccv}
                onChange={(e) =>
                  setNewCard({ ...newCard, ccv: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Saldo"
                value={newCard.balance}
                onChange={(e) =>
                  setNewCard({ ...newCard, balance: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Número de Cuenta Asociada"
                value={newCard.accountId}
                onChange={(e) =>
                  setNewCard({ ...newCard, accountId: e.target.value })
                }
              />
              <button onClick={handleCreate}>Guardar</button>
              <button className="--dangerous" onClick={() => setShowNewModal(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Modal EDITAR Tarjeta */}
        {showEditModal && editingCard && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Editar Tarjeta</h2>
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={editingCard.number}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, number: e.target.value })
                }
              />
              <select
                value={editingCard.type}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, type: e.target.value })
                }
              >
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
              </select>
              <input
                type="text"
                placeholder="Fecha Expiración"
                value={editingCard.dueDate}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, dueDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Código de Seguridad"
                value={editingCard.ccv}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, ccv: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Saldo"
                value={editingCard.balance}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, balance: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Número de Cuenta Asociada"
                value={editingCard.accountId}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, accountId: e.target.value })
                }
              />
              <button onClick={handleUpdate}>Guardar</button>
              <button className="--dangerous" onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cards;
