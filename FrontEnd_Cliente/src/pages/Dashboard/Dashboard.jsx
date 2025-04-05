// React
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Container from "../../components/Container/Container";

//Styling

function Dashboard() {
  // Location para mantener el nombre de usuario al navegar
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || "");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  return (
    <MainLayout username={username}>
      <Container className="container-standard">
        <Outlet/>
      </Container>
    </MainLayout>
  );
}

export default Dashboard;
