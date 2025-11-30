import axios from "axios";

const API = "http://localhost:3000/api/livros";

export async function listarLivros() {
  const response = await axios.get(API);
  return response.data;
}

export async function criarLivro(novoLivro) {
  const response = await axios.post(API, novoLivro);
  return response.data;
}

export async function deletarLivro(id) {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
}
