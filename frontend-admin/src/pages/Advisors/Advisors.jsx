import { useEffect, useState } from "react";

function AsesoresCredito() {
  const [asesores, setAsesores] = useState([]);
  const [nuevoAsesor, setNuevoAsesor] = useState({
    nombre: "",
    cedula: "",
    nacimiento: "",
    metaColones: "",
    metaDolares: ""
  });

  const [editando, setEditando] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  useEffect(() => {
    obtenerAsesores();
  }, []);

  const obtenerAsesores = () => {
    // TODO: GET a la API para obtener asesores
  };

  const handleCreate = () => {
    // TODO: POST a la API para crear asesor
    setMostrarModalNuevo(false);
  };

  const handleDelete = (index) => {
    // TODO: DELETE a la API para eliminar asesor
  };

  const handleEdit = (asesor) => {
    setEditando({ ...asesor });
    setMostrarModalEditar(true);
  };

  const handleUpdate = () => {
    // TODO: PUT a la API para actualizar asesor
    setMostrarModalEditar(false);
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Asesores de Crédito</h1>

        <button onClick={() => setMostrarModalNuevo(true)}>Agregar Asesor</button>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Nacimiento</th>
              <th>Meta ₡</th>
              <th>Meta $</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asesores.map((asesor, index) => (
              <tr key={index}>
                <td>{asesor.nombre}</td>
                <td>{asesor.cedula}</td>
                <td>{asesor.nacimiento}</td>
                <td>₡{asesor.metaColones}</td>
                <td>${asesor.metaDolares}</td>
                <td>
                  <button onClick={() => handleEdit(asesor)}>Editar</button>
                  <button className="--dangerous" onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal NUEVO asesor */}
        {mostrarModalNuevo && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Nuevo Asesor</h2>
              {Object.entries(nuevoAsesor).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "nacimiento" ? "date" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) => setNuevoAsesor({ ...nuevoAsesor, [key]: e.target.value })}
                />
              ))}
              <button onClick={handleCreate}>Guardar</button>
              <button className="--dangerous" onClick={() => setMostrarModalNuevo(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Modal EDITAR asesor */}
        {mostrarModalEditar && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Editar Asesor</h2>
              {Object.entries(editando).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "nacimiento" ? "date" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) => setEditando({ ...editando, [key]: e.target.value })}
                />
              ))}
              <button onClick={handleUpdate}>Guardar</button>
              <button className="--dangerous" onClick={() => setMostrarModalEditar(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AsesoresCredito;
