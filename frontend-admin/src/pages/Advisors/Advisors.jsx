import { useEffect, useState } from "react";

function Advisors() {
  const [advisors, setAdvisors] = useState([]);
  const [newAdvisor, setNewAdvisor] = useState({
    idNumber: "",
    firstName: "",
    middleName1: "",
    middleName2: "",
    lastName1: "",
    lastName2: "",
    birthDate: "",
    salesTargetColones: "",
    salesTargetDollars: ""
  });

  const [editing, setEditing] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const API_URL = "http://192.168.50.135:6969/api/Advisor";

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAdvisors(data);
  };

  const handleCreate = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newAdvisor,
        salesTargetColones: parseFloat(newAdvisor.salesTargetColones),
        salesTargetDollars: parseFloat(newAdvisor.salesTargetDollars),
        birthDate: new Date(newAdvisor.birthDate).toISOString()
      })
    });
    setShowNewModal(false);
    setNewAdvisor({
      idNumber: "",
      firstName: "",
      middleName1: "",
      middleName2: "",
      lastName1: "",
      lastName2: "",
      birthDate: "",
      salesTargetColones: "",
      salesTargetDollars: ""
    });
    fetchAdvisors();
  };

  const handleDelete = async (idNumber) => {
    await fetch(`${API_URL}/${idNumber}`, {
      method: "DELETE"
    });
    fetchAdvisors();
  };

  const handleEdit = (advisor) => {
    setEditing(advisor);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        salesTargetColones: parseFloat(editing.salesTargetColones),
        salesTargetDollars: parseFloat(editing.salesTargetDollars),
        birthDate: new Date(editing.birthDate).toISOString()
      })
    });
    setShowEditModal(false);
    fetchAdvisors();
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Asesores de Crédito</h1>

        <button onClick={() => setShowNewModal(true)}>Agregar Asesor</button>

        <table>
          <thead>
            <tr>
              <th>Nombre completo</th>
              <th>Cédula</th>
              <th>Fecha de nacimiento</th>
              <th>Meta ₡</th>
              <th>Meta $</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {advisors.map((a, index) => (
              <tr key={index}>
                <td>{`${a.firstName} ${a.middleName1} ${a.middleName2} ${a.lastName1} ${a.lastName2}`}</td>
                <td>{a.idNumber}</td>
                <td>{a.birthDate?.split("T")[0]}</td>
                <td>₡{a.salesTargetColones}</td>
                <td>${a.salesTargetDollars}</td>
                <td>
                  <button onClick={() => handleEdit(a)}>Editar</button>
                  <button className="--dangerous" onClick={() => handleDelete(a.idNumber)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal NUEVO */}
        {showNewModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Nuevo Asesor</h2>
              {Object.entries(newAdvisor).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "birthDate" ? "date" : "text"}
                  placeholder={key}
                  value={value}
                  onChange={(e) => setNewAdvisor({ ...newAdvisor, [key]: e.target.value })}
                />
              ))}
              <button onClick={handleCreate}>Guardar</button>
              <button className="--dangerous" onClick={() => setShowNewModal(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Modal EDITAR */}
        {showEditModal && editing && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Editar Asesor</h2>
              {Object.entries(editing).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "birthDate" ? "date" : "text"}
                  placeholder={key}
                  value={value}
                  onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                />
              ))}
              <button onClick={handleUpdate}>Guardar</button>
              <button className="--dangerous" onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Advisors;