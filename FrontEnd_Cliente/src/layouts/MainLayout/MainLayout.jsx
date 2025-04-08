// React

// Components
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import MainNavBar from "../../components/NavBar/MainNavBar";

// Styling

function MainLayout(props) {
  return (
    <div className="main-layout-wrapper">
      <Header className="header-standard">
        <h1>
          <span style={{color: 'var(--color-primary)'}}>Tec</span>Bank
        </h1>
      <MainNavBar username={props.username}/>
      </Header>
      <Container className="container-standard">{props.children}</Container>
    </div>
  );
}

export default MainLayout;