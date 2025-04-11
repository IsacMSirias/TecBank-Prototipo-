import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Roles() {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoRol, setNuevoRol] = useState({ nombre: "", descripcion: "" });

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  useEffect(() => {
    obtenerRoles();
  }, []);

  const obtenerRoles = () => {
    // TODO: Reemplazar con llamada a la API
    // fetch("https://localhost:7143/api/Roles")
    //   .then((res) => res.json())
    //   .then((data) => setRoles(data));

    // Datos simulados
    setRoles([
      { id: 1, nombre: "Administrador", descripcion: "Acceso total" },
      { id: 2, nombre: "Cliente", descripcion: "Acceso limitado" },
    ]);
    setLoading(false);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // TODO: POST a la API
    console.log("Crear rol:", nuevoRol);
    setNuevoRol({ nombre: "", descripcion: "" });
  };

  const handleUpdate = (id) => {
    // TODO: PUT a la API
    console.log("Actualizar rol ID:", id);
  };

  const handleDelete = (id) => {
    // TODO: DELETE a la API
    console.log("Eliminar rol ID:", id);
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Roles</h1>

        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Nombre del rol"
            value={nuevoRol.nombre}
            onChange={(e) =>
              setNuevoRol({ ...nuevoRol, nombre: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={nuevoRol.descripcion}
            onChange={(e) =>
              setNuevoRol({ ...nuevoRol, descripcion: e.target.value })
            }
            required
          />
          <button type="submit">Agregar Rol</button>
        </form>

        {loading ? (
          <p>Cargando roles...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.id}>
                  <td>{rol.id}</td>
                  <td>{rol.nombre}</td>
                  <td>{rol.descripcion}</td>
                  <td>
                    <button onClick={() => handleUpdate(rol.id)}>Editar</button>
                    <button className="--dangerous" onClick={() => handleDelete(rol.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Roles;
