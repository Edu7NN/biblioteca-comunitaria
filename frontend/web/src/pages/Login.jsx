import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const [erro, setErro] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      navigate("/dashboard");

    } catch (err) {
      setErro("Email ou senha incorretos");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <p className="forgot">Esqueceu a senha?</p>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <p className="cadastro" onClick={() => navigate("/cadastro")}>
          Cadastre-se
        </p>
      </div>
    </div>
  );
}
