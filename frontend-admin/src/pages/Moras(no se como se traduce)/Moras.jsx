import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Moras() {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");
  const [moras, setMoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalNueva, setMostrarModalNueva] = useState(false);
  const [nuevaMora, setNuevaMora] = useState({
    nombre: "",
    cedula: "",
    numeroPrestamo: "",
    cuotasVencidas: "",
    montoAdeudado: ""
  });

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  useEffect(() => {
    obtenerMoras();
  }, []);

  const obtenerMoras = () => {
    // TODO: Reemplazar con llamada a la API
    setMoras([
      {
      }
    ]);
    setLoading(false);
  };

  const handleGenerateAuto = () => {
    // TODO: GET a la API para generar automáticamente
    console.log("Generar moras automáticamente");
  };

  const handleCreateMora = () => {
    // TODO: POST a la API para crear mora manualmente
    console.log("Crear mora manual:", nuevaMora);
    setMostrarModalNueva(false);
    setNuevaMora({
      nombre: "",
      cedula: "",
      numeroPrestamo: "",
      cuotasVencidas: 0,
      montoAdeudado: 0
    });
  };

  return (
    <div className="standard-wrapper">
      <main>
        <h1>Gestión de Moras</h1>

        <div className="button-group">
          <button onClick={handleGenerateAuto}>Generar mora automáticamente</button>

          <button onClick={() => setMostrarModalNueva(true)}>Generar mora manualmente</button>
        </div>

        {loading ? (
          <p>Cargando moras...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>N° Préstamo</th>
                <th>Cuotas Vencidas</th>
                <th>Monto Adeudado</th>
              </tr>
            </thead>
            <tbody>
              {moras.map((mora, index) => (
                <tr key={index}>
                  <td>{mora.nombre}</td>
                  <td>{mora.cedula}</td>
                  <td>{mora.numeroPrestamo}</td>
                  <td>{mora.cuotasVencidas}</td>
                  <td>{mora.montoAdeudado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal NUEVA Mora */}
        {mostrarModalNueva && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Agregar Nueva Mora</h2>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nuevaMora.nombre}
                onChange={(e) => setNuevaMora({ ...nuevaMora, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cédula"
                value={nuevaMora.cedula}
                onChange={(e) => setNuevaMora({ ...nuevaMora, cedula: e.target.value })}
              />
              <input
                type="text"
                placeholder="Número de préstamo"
                value={nuevaMora.numeroPrestamo}
                onChange={(e) => setNuevaMora({ ...nuevaMora, numeroPrestamo: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cuotas vencidas"
                value={nuevaMora.cuotasVencidas}
                onChange={(e) => setNuevaMora({ ...nuevaMora, cuotasVencidas: e.target.value })}
              />
              <input
                type="text"
                placeholder="Monto adeudado"
                value={nuevaMora.montoAdeudado}
                onChange={(e) => setNuevaMora({ ...nuevaMora, montoAdeudado: e.target.value})}
              />
              <button onClick={handleCreateMora}>Guardar</button>
              <button className="--dangerous" onClick={() => setMostrarModalNueva(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Moras;