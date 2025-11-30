// src/models/participacaoModel.js
import { pool } from "../config/db.js";

export const Participacao = {
  async create({ id_usuario, id_evento }) {
    const q = `INSERT INTO biblioteca.participacao_evento (id_usuario, id_evento) VALUES ($1,$2) ON CONFLICT DO NOTHING RETURNING *`;
    const { rows } = await pool.query(q, [id_usuario, id_evento]);
    return rows[0];
  },

  async listByEvento(id_evento) {
    const { rows } = await pool.query(
      `SELECT p.id_participacao, u.id_usuario, u.nome, u.email
       FROM biblioteca.participacao_evento p
       JOIN biblioteca.usuario u ON p.id_usuario = u.id_usuario
       WHERE p.id_evento = $1`, [id_evento]);
    return rows;
  }
};
