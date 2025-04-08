// React

// Components
import NavBar from "./NavBar";
import AppLink from "../AppLink/AppLink";
import Button from "../Button/Button";

// Styling
import "./NavBar.css";

function MainNavBar(props) {
  return (
    <>
      <NavBar className="nav-bar-horizontal">
        <ul className="nav-bar-horizontal-list">
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/inicio"
              text="Inicio"
            />
          </li>
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/cuentas"
              text="Cuentas"
            />
          </li>
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/tarjetas"
              text="Tarjetas"
            />
          </li>
          <li>
            <AppLink
              className="app-link-basic"
              to="/dashboard/prestamos"
              text="Prestamos"
            />
          </li>
        </ul>
        <h4>
          <span>Sesión iniciada como: {props.username}</span>
          <Button /* Al intentar poner que esto tire al login con un navigate, todo explota lol*/
            className="button-primary medium"
            text="Cerrar sesión"
          />
        </h4>
      </NavBar>
    </>
  );
}

export default MainNavBar;