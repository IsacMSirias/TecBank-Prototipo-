import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cards() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username || "");

  const [tarjetas, setTarjetas] = useState([]);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: "",
    tipo: "Débito",
    expiracion: "",
    codigoSeguridad: "",
    saldo: 0,
    cuentaId: "",
  });

  const [editando, setEditando] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
    obtenerTarjetas();
  }, [location.state]);

  const obtenerTarjetas = () => {
    // TODO: Llamada GET a la API
  };

  const handleCreate = () => {
    // TODO: POST a la API para crear tarjeta
    setMostrarModalNuevo(false);
  };

  const handleDelete = (index) => {
    // TODO: DELETE a la API para eliminar tarjeta
  };

  const handleEdit = (tarjeta) => {
    setEditando({ ...tarjeta });
    setMostrarModalEditar(true);
  };

  const handleUpdate = () => {
    // TODO: PUT a la API para actualizar tarjeta
    setMostrarModalEditar(false);
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Tarjetas</h1>

        <button onClick={() => setMostrarModalNuevo(true)}>Agregar Tarjeta</button>

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
            {tarjetas.map((tarjeta, index) => (
              <tr key={index}>
                <td>{tarjeta.numero}</td>
                <td>{tarjeta.tipo}</td>
                <td>{tarjeta.expiracion}</td>
                <td>{tarjeta.saldo}</td>
                <td>
                  <button onClick={() => handleEdit(tarjeta)}>Editar</button>
                  <button
                    className="--dangerous"
                    onClick={() => handleDelete(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal NUEVA Tarjeta */}
        {mostrarModalNuevo && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Agregar Nueva Tarjeta</h2>
              {Object.entries(nuevaTarjeta).map(([key, value]) => (
                key !== "tipo" && key !== "cuentaId" ? (
                  <input
                    key={key}
                    type={key === "saldo" ? "number" : "text"}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={(e) =>
                      setNuevaTarjeta({ ...nuevaTarjeta, [key]: e.target.value })
                    }
                  />
                ) : (
                  key === "tipo" ? (
                    <select
                      key={key}
                      value={value}
                      onChange={(e) =>
                        setNuevaTarjeta({ ...nuevaTarjeta, tipo: e.target.value })
                      }
                    >
                      <option value="Débito">Débito</option>
                      <option value="Crédito">Crédito</option>
                    </select>
                  ) : (
                    <input
                      key={key}
                      type="text"
                      placeholder="Número de Cuenta Asociada"
                      value={value}
                      onChange={(e) =>
                        setNuevaTarjeta({ ...nuevaTarjeta, cuentaId: e.target.value })
                      }
                    />
                  )
                )
              ))}
              <button onClick={handleCreate}>Guardar</button>
              <button className="--dangerous" onClick={() => setMostrarModalNuevo(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Modal EDITAR Tarjeta */}
        {mostrarModalEditar && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Editar Tarjeta</h2>
              {Object.entries(editando).map(([key, value]) => (
                key !== "tipo" && key !== "cuentaId" ? (
                  <input
                    key={key}
                    type={key === "saldo" ? "number" : "text"}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={(e) =>
                      setEditando({ ...editando, [key]: e.target.value })
                    }
                  />
                ) : (
                  key === "tipo" ? (
                    <select
                      key={key}
                      value={value}
                      onChange={(e) =>
                        setEditando({ ...editando, tipo: e.target.value })
                      }
                    >
                      <option value="Débito">Débito</option>
                      <option value="Crédito">Crédito</option>
                    </select>
                  ) : (
                    <input
                      key={key}
                      type="text"
                      placeholder="Número de Cuenta Asociada"
                      value={value}
                      onChange={(e) =>
                        setEditando({ ...editando, cuentaId: e.target.value })
                      }
                    />
                  )
                )
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

export default Cards;
