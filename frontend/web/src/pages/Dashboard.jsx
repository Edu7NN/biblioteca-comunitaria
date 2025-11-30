import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    livros: 0,
    emprestimos: 0,
    usuarios: 0,
    eventos: 0,
  });

  async function carregarEstatisticas() {
    try {
      const [livros, emprestimos, usuarios, eventos] = await Promise.all([
        api.get("/livros/total"),
        api.get("/emprestimos/total"),
        api.get("/usuarios/total"),
        api.get("/eventos/total"),
      ]);

      setStats({
        livros: livros.data.total,
        emprestimos: emprestimos.data.total,
        usuarios: usuarios.data.total,
        eventos: eventos.data.total,
      });
    } catch (err) {
      console.log("Erro ao carregar estatísticas:", err);
    }
  }

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dash-card">
        <div className="dash-header">
          <span className="icon-user">👤</span>
          <h2>Biblioteca comunitária</h2>
        </div>

        <div className="dash-buttons">

          <button className="dash-btn">
            Livros cadastrados
            <span>{stats.livros}</span>
          </button>

          <button className="dash-btn">
            Empréstimos ativos
            <span>{stats.emprestimos}</span>
          </button>

          <button className="dash-btn">
            Usuários registrados
            <span>{stats.usuarios}</span>
          </button>

          <button className="dash-btn">
            Eventos cadastrados
            <span>{stats.eventos}</span>
          </button>

          <button className="dash-btn">
            Histórico de empréstimo
          </button>

        </div>
      </div>
    </div>
  );
}
