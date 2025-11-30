// src/models/livroModel.js
import { pool } from "../config/db.js";

export const Livro = {
  async create({ titulo, autor, categoria, ano_publicacao, exemplares_total }) {
    const q = `
      INSERT INTO biblioteca.livro
      (titulo, autor, categoria, ano_publicacao, exemplares_total, exemplares_disponiveis)
      VALUES ($1,$2,$3,$4,$5,$5)
      RETURNING *
    `;
    const values = [titulo, autor, categoria, ano_publicacao, exemplares_total];
    const { rows } = await pool.query(q, values);
    return rows[0];
  },

  async findAll({ search } = {}) {
    if (search) {
      const s = `%${search.toLowerCase()}%`;
      const q = `SELECT * FROM biblioteca.livro WHERE LOWER(titulo) LIKE $1 OR LOWER(autor) LIKE $1 OR LOWER(categoria) LIKE $1 ORDER BY titulo`;
      const { rows } = await pool.query(q, [s]);
      return rows;
    }
    const { rows } = await pool.query(`SELECT * FROM biblioteca.livro ORDER BY titulo`);
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM biblioteca.livro WHERE id_livro = $1`, [id]);
    return rows[0];
  },

  async update(id, fields) {
    const cols = [];
    const vals = [];
    let idx = 1;
    for (const key in fields) {
      cols.push(`${key} = $${idx}`);
      vals.push(fields[key]);
      idx++;
    }
    if (cols.length === 0) return null;
    vals.push(id);
    const q = `UPDATE biblioteca.livro SET ${cols.join(", ")} WHERE id_livro = $${idx} RETURNING *`;
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async remove(id) {
    await pool.query(`DELETE FROM biblioteca.livro WHERE id_livro = $1`, [id]);
    return true;
  }
};
