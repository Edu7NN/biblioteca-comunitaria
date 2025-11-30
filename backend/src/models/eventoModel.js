// src/models/eventoModel.js
import { pool } from "../config/db.js";

export const Evento = {
  async create({ titulo, descricao, data_evento, local }) {
    const q = `INSERT INTO biblioteca.evento (titulo, descricao, data_evento, local) VALUES ($1,$2,$3,$4) RETURNING *`;
    const { rows } = await pool.query(q, [titulo, descricao, data_evento, local]);
    return rows[0];
  },

  async findAll() {
    const { rows } = await pool.query(`SELECT * FROM biblioteca.evento WHERE data_evento >= CURRENT_DATE ORDER BY data_evento`);
    return rows;
  },

  async findById(id_evento) {
    const { rows } = await pool.query(`SELECT * FROM biblioteca.evento WHERE id_evento = $1`, [id_evento]);
    return rows[0];
  }
};
