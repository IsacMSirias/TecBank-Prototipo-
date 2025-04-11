import { useState } from "react";

function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    cliente: "",
    monto: "",
    tasa: "",
    cuotas: ""
  });
  const [editando, setEditando] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const handleCreate = () => {
    // TODO: Crear nuevo préstamo con la API
    setMostrarModalNuevo(false);
    setNuevoPrestamo({ cliente: "", monto: "", tasa: "", cuotas: "" });
  };

  const handleUpdate = () => {
    // TODO: Actualizar préstamo con la API
    setMostrarModalEditar(false);
  };

  const handleEdit = (prestamo) => {
    setEditando(prestamo);
    setMostrarModalEditar(true);
  };

  const handleDelete = (index) => {
    // TODO: Eliminar préstamo con la API
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Préstamos</h1>

        <button onClick={() => setMostrarModalNuevo(true)}>Nuevo Préstamo</button>

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
            {prestamos.map((prestamo, index) => (
              <tr key={index}>
                <td>{prestamo.numero}</td>
                <td>{prestamo.cliente}</td>
                <td>{prestamo.montoOriginal}</td>
                <td>{prestamo.saldo}</td>
                <td>
                  <button onClick={() => handleEdit(prestamo)}>Editar</button>
                  <button className="--dangerous" onClick={() => handleDelete(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal NUEVO Préstamo */}
        {mostrarModalNuevo && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Agregar Nuevo Préstamo</h2>
              {Object.entries(nuevoPrestamo).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "monto" || key === "tasa" || key === "cuotas" ? "number" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) =>
                    setNuevoPrestamo({ ...nuevoPrestamo, [key]: e.target.value })
                  }
                />
              ))}
              <button onClick={handleCreate}>Guardar</button>
              <button className="--dangerous" onClick={() => setMostrarModalNuevo(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Modal EDITAR Préstamo */}
        {mostrarModalEditar && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Editar Préstamo</h2>
              {editando && Object.entries(editando).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "monto" || key === "tasa" || key === "cuotas" ? "number" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) =>
                    setEditando({ ...editando, [key]: e.target.value })
                  }
                />
              ))}
              <button onClick={handleUpdate}>Guardar</button>
              <button className="--dangerous" onClick={() => setMostrarModalEditar(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Prestamos;
