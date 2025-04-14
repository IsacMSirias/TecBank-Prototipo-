import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Clients() {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    secondLastName: "",
    phone: "",
    address: "",
    monthlyIncome: "",
    clientType: "Físico",
    username: "",
    password: "",
    state: true,
  });
  const [editingClient, setEditingClient] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const API_URL = "http://192.168.50.135:6969/api/Client";

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
    fetchClients();
  }, [location.state]);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/GetAll`);

      const data = await res.json();
      setClients(data.value);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      setShowNewModal(false);
      setNewClient({
        firstName: "",
        middleName: "",
        lastName: "",
        secondLastName: "",
        phone: "",
        address: "",
        monthlyIncome: "",
        clientType: "Físico",
        username: "",
        password: "",
        state: true,
      });
      fetchClients();
    } catch (err) {
      console.error("Error al crear cliente:", err);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClient),
      });
      setShowEditModal(false);
      setEditingClient(null);
      fetchClients();
    } catch (err) {
      console.error("Error al actualizar cliente:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
      fetchClients();
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
    }
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Clientes</h1>
        <button onClick={() => setShowNewModal(true)}>Agregar Cliente</button>

        <table>
          <thead>
            <tr>
              <th>Nombre completo</th>
              <th>Usuario</th>
              <th>Tipo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{`${c.firstName} ${c.middleName} ${c.lastName} ${c.secondLastName}`}</td>
                <td>{c.username}</td>
                <td>{c.clientType}</td>
                <td>{c.phone}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Editar</button>
                  <button className="--dangerous" onClick={() => handleDelete(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showNewModal && (
          <div className="modal-backdrop">
            <div className="modal wide">
              <div className="modal-header"><h2>Nuevo Cliente</h2></div>
              <form className="modal-body">
                <input type="text" placeholder="Nombre" value={newClient.firstName} onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })} />
                <input type="text" placeholder="Segundo nombre" value={newClient.middleName} onChange={(e) => setNewClient({ ...newClient, middleName: e.target.value })} />
                <input type="text" placeholder="Apellido paterno" value={newClient.lastName} onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })} />
                <input type="text" placeholder="Apellido materno" value={newClient.secondLastName} onChange={(e) => setNewClient({ ...newClient, secondLastName: e.target.value })} />
                <input type="text" placeholder="Teléfono" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} />
                <input type="text" placeholder="Dirección" value={newClient.address} onChange={(e) => setNewClient({ ...newClient, address: e.target.value })} />
                <input type="number" placeholder="Ingreso mensual" value={newClient.monthlyIncome} onChange={(e) => setNewClient({ ...newClient, monthlyIncome: e.target.value })} />
                <input type="text" placeholder="Usuario" value={newClient.username} onChange={(e) => setNewClient({ ...newClient, username: e.target.value })} />
                <input type="password" placeholder="Contraseña" value={newClient.password} onChange={(e) => setNewClient({ ...newClient, password: e.target.value })} />
                <select value={newClient.clientType} onChange={(e) => setNewClient({ ...newClient, clientType: e.target.value })}>
                  <option value="Físico">Físico</option>
                  <option value="Jurídico">Jurídico</option>
                </select>
              </form>
              <div className="modal-footer">
                <button onClick={handleCreate}>Guardar</button>
                <button className="--dangerous" onClick={() => setShowNewModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showEditModal && editingClient && (
          <div className="modal-backdrop">
            <div className="modal wide">
              <div className="modal-header"><h2>Editar Cliente</h2></div>
              <form className="modal-body">
                {["firstName", "middleName", "lastName", "secondLastName", "phone", "address", "monthlyIncome", "username", "password"].map((key) => (
                  <input
                    key={key}
                    type={key === "password" ? "password" : key === "monthlyIncome" ? "number" : "text"}
                    placeholder={
                      {
                        firstName: "Nombre",
                        middleName: "Segundo nombre",
                        lastName: "Apellido paterno",
                        secondLastName: "Apellido materno",
                        phone: "Teléfono",
                        address: "Dirección",
                        monthlyIncome: "Ingreso mensual",
                        username: "Usuario",
                        password: "Contraseña",
                      }[key]
                    }
                    value={editingClient[key]}
                    onChange={(e) => setEditingClient({ ...editingClient, [key]: e.target.value })}
                  />
                ))}
                <select value={editingClient.clientType} onChange={(e) => setEditingClient({ ...editingClient, clientType: e.target.value })}>
                  <option value="Físico">Físico</option>
                  <option value="Jurídico">Jurídico</option>
                </select>
              </form>
              <div className="modal-footer">
                <button onClick={handleUpdate}>Guardar</button>
                <button className="--dangerous" onClick={() => setShowEditModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Clients;
