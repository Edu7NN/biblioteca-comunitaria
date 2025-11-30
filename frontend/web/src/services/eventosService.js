import axios from "axios";

const API = "http://localhost:3000/api/eventos";

export async function listarEventos() {
  const response = await axios.get(API);
  return response.data;
}

export async function criarEvento(evento) {
  const response = await axios.post(API, evento);
  return response.data;
}

export async function deletarEvento(id) {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
}
