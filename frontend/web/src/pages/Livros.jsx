import { useEffect, useState } from "react";
import { listarLivros, criarLivro, deletarLivro } from "../services/livrosService";
import styles from "../styles/Livros.module.css";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    ano_publicacao: "",
    exemplares_total: 1,
  });

  async function carregarLivros() {
    try {
      const data = await listarLivros();
      setLivros(data);
    } catch (e) {
      console.error("Erro ao listar livros:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await criarLivro(form);
      setShowForm(false);
      setForm({
        titulo: "",
        autor: "",
        categoria: "",
        ano_publicacao: "",
        exemplares_total: 1,
      });
      carregarLivros();
    } catch (e) {
      console.error("Erro ao criar livro:", e);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir este livro?")) return;
    await deletarLivro(id);
    carregarLivros();
  }

  useEffect(() => {
    carregarLivros();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Livros</h1>

      <button className={styles.addButton} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Fechar" : "Adicionar Livro"}
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

          <input
            type="text"
            placeholder="Autor"
            value={form.autor}
            onChange={(e) => setForm({ ...form, autor: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Categoria"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Ano"
            value={form.ano_publicacao}
            onChange={(e) => setForm({ ...form, ano_publicacao: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Qtd Exemplares"
            min="1"
            value={form.exemplares_total}
            onChange={(e) => setForm({ ...form, exemplares_total: e.target.value })}
            required
          />

          <button type="submit">Salvar</button>
        </form>
      )}

      <div className={styles.list}>
        {livros.map((livro) => (
          <div key={livro.id} className={styles.card}>
            <h3>{livro.titulo}</h3>
            <p><strong>Autor:</strong> {livro.autor}</p>
            <p><strong>Categoria:</strong> {livro.categoria}</p>
            <p><strong>Ano:</strong> {livro.ano_publicacao}</p>
            <p><strong>Exemplares:</strong> {livro.exemplares_total}</p>

            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(livro.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
