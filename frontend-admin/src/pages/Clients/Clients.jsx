import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Clientes() {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
    telefono: "",
    ingreso: "",
    tipo: "Físico",
    usuario: "",
    password: ""
  });

  const [editando, setEditando] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
    obtenerClientes();
  }, [location.state]);

  const obtenerClientes = () => {
    const datosEjemplo = [
      {
        nombre: "Carlos Rodríguez",
        cedula: "001-010101-0001A",
        direccion: "San José, Costa Rica",
        telefono: "8888-8888",
        ingreso: "850000",
        tipo: "Físico",
        usuario: "carlosr",
        password: "1234"
      },
      {
        nombre: "Inversiones Tico S.A.",
        cedula: "3-101-123456",
        direccion: "Heredia, Costa Rica",
        telefono: "2222-2222",
        ingreso: "3500000",
        tipo: "Jurídico",
        usuario: "invstico",
        password: "abcd1234"
      }
    ];
    setClientes(datosEjemplo);
  };

  const handleCreate = () => {
    setMostrarModalNuevo(false);
  };

  const handleDelete = (index) => {
    // TODO: DELETE a la API
  };

  const handleEdit = (cliente) => {
    setEditando({ ...cliente });
    setMostrarModalEditar(true);
  };

  const handleUpdate = () => {
    setMostrarModalEditar(false);
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Clientes</h1>

        <button onClick={() => setMostrarModalNuevo(true)}>Agregar Cliente</button>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Tipo</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nombre}</td>
                <td>{cliente.cedula}</td>
                <td>{cliente.tipo}</td>
                <td>{cliente.usuario}</td>
                <td>
                  <button onClick={() => handleEdit(cliente)}>Editar</button>
                  <button className="--dangerous" onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mostrarModalNuevo && (
          <div className="modal-backdrop">
            <div className="modal wide">
              <div className="modal-header">
                <h2>Nuevo Cliente</h2>
              </div>
              <form className="modal-body">
                <input type="text" placeholder="Nombre completo" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} />
                <input type="text" placeholder="Cédula" value={nuevoCliente.cedula} onChange={(e) => setNuevoCliente({ ...nuevoCliente, cedula: e.target.value })} />
                <input type="text" placeholder="Dirección" value={nuevoCliente.direccion} onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })} />
                <input type="tel" placeholder="Teléfono" value={nuevoCliente.telefono} onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })} />
                <input type="number" placeholder="Ingreso mensual" value={nuevoCliente.ingreso} onChange={(e) => setNuevoCliente({ ...nuevoCliente, ingreso: e.target.value })} />
                <select value={nuevoCliente.tipo} onChange={(e) => setNuevoCliente({ ...nuevoCliente, tipo: e.target.value })}>
                  <option value="Físico">Físico</option>
                  <option value="Jurídico">Jurídico</option>
                </select>
                <input type="text" placeholder="Usuario" value={nuevoCliente.usuario} onChange={(e) => setNuevoCliente({ ...nuevoCliente, usuario: e.target.value })} />
                <input type="password" placeholder="Contraseña" value={nuevoCliente.password} onChange={(e) => setNuevoCliente({ ...nuevoCliente, password: e.target.value })} />
              </form>
              <div className="modal-footer">
                <button type="button" onClick={handleCreate}>Guardar</button>
                <button type="button" className="--dangerous" onClick={() => setMostrarModalNuevo(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {mostrarModalEditar && (
          <div className="modal-backdrop">
            <div className="modal wide">
              <div className="modal-header">
                <h2>Editar Cliente</h2>
              </div>
              <form className="modal-body">
                {Object.entries(editando).map(([key, value]) => (
                  key !== "tipo" ? (
                    <input key={key} type={key === "password" ? "password" : "text"} placeholder={key} value={value} onChange={(e) => setEditando({ ...editando, [key]: e.target.value })} />
                  ) : (
                    <select key={key} value={value} onChange={(e) => setEditando({ ...editando, tipo: e.target.value })}>
                      <option value="Físico">Físico</option>
                      <option value="Jurídico">Jurídico</option>
                    </select>
                  )
                ))}
              </form>
              <div className="modal-footer">
                <button onClick={handleUpdate}>Guardar</button>
                <button className="--dangerous" onClick={() => setMostrarModalEditar(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Clientes;