import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Livros from "./pages/Livros";
import Eventos from "./pages/Eventos";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/perfil" element={<Profile />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/livros" element={<Livros />} />
    </Routes>
  );
}
