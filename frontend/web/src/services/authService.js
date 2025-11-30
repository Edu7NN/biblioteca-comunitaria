// src/services/authService.js
import axios from "axios";

const API = "http://localhost:3000/api/auth";

export async function login(email, senha) {
  const response = await axios.post(`${API}/login`, { email, senha });
  return response.data;
}

export async function signup(nome, email, senha, cpf, telefone, endereco) {
  const response = await axios.post(`${API}/register`, {
    nome,
    cpf,
    telefone,
    endereco,
    email,
    senha
  });
  return response.data;
}

export async function getProfile() {
  const response = await axios.get(`${API}/profile`);
  return response.data;
}
