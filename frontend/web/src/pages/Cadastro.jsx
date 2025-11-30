import { useState } from "react";
import api from "../services/api";
import "../styles/cadastro.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,
        endereco,
        cpf,
        telefone
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar. Verifique os dados.");
      console.log(error);
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Cadastrar</h2>

        <form onSubmit={handleSubmit}>

          <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />

          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />

          <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />

          <input placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

          <button type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}
