// React

// Components
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import NavBar from "../../components/NavBar/NavBar";
import AppLink from "../../components/AppLink/AppLink";
import Button from "../../components/Button/Button";

// Styling

function MainLayout(props) {
  return (
    <div>
      <Header className="header-standard">
        <h1>
          <span style={{color: 'var(--color-primary)'}}>Tec</span>Bank
        </h1>
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
      </Header>
      <Container className="container-standard">{props.children}</Container>
    </div>
  );
}

export default MainLayout;