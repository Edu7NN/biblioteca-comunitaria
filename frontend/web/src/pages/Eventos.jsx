import { useEffect, useState } from "react";
import {
  listarEventos,
  criarEvento,
  deletarEvento,
} from "../services/eventosService";
import styles from "../styles/Eventos.module.css";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data_evento: "",
    local: "",
  });

  async function carregarEventos() {
    try {
      const data = await listarEventos();
      setEventos(data);
    } catch (e) {
      console.error("Erro ao listar eventos:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await criarEvento(form);

      setForm({
        titulo: "",
        descricao: "",
        data_evento: "",
        local: "",
      });

      setShowForm(false);
      carregarEventos();
    } catch (e) {
      console.error("Erro ao criar evento:", e);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir este evento?")) return;

    try {
      await deletarEvento(id);
      carregarEventos();
    } catch (e) {
      console.error("Erro ao excluir evento:", e);
    }
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Eventos</h1>

      <button
        className={styles.addButton}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Fechar" : "Adicionar Evento"}
      </button>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            required
          />

          <textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            rows={4}
            required
          ></textarea>

          <input
            type="date"
            value={form.data_evento}
            onChange={(e) => setForm({ ...form, data_evento: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Local"
            value={form.local}
            onChange={(e) => setForm({ ...form, local: e.target.value })}
            required
          />

          <button type="submit">Salvar</button>
        </form>
      )}

      <div className={styles.list}>
        {eventos.map((evento) => (
          <div key={evento.id} className={styles.card}>
            <h3>{evento.titulo}</h3>
            <p>{evento.descricao}</p>

            <p>
              <strong>Data:</strong> {new Date(evento.data_evento).toLocaleDateString("pt-BR")}
            </p>

            <p>
              <strong>Local:</strong> {evento.local}
            </p>

            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(evento.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
