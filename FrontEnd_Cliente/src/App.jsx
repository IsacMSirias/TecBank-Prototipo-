import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from "./components/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Página de Login</h1>
      <Button text="Iniciar Sesión" />
    </div>
  );
}
function Dashboard() {
  return <h1>Bienvenido al Panel</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

