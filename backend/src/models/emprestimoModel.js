// src/models/emprestimoModel.js
import { pool } from "../config/db.js";

export const Emprestimo = {
  async create({ id_usuario, id_livro, data_devolucao_prevista }) {
    // 1) validar existência e disponibilidade
    const livroRes = await pool.query(`SELECT exemplares_disponiveis FROM biblioteca.livro WHERE id_livro = $1`, [id_livro]);
    const livro = livroRes.rows[0];
    if (!livro) throw { status: 404, message: "Livro não encontrado" };
    if (livro.exemplares_disponiveis <= 0) throw { status: 400, message: "Sem exemplares disponíveis" };

    // 2) transação atômica: decrementa exemplar e insere emprestimo
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(`UPDATE biblioteca.livro SET exemplares_disponiveis = exemplares_disponiveis - 1 WHERE id_livro = $1`, [id_livro]);

      const q = `INSERT INTO biblioteca.emprestimo (id_usuario, id_livro, data_devolucao_prevista, status)
                 VALUES ($1,$2,$3,'ativo') RETURNING *`;
      const { rows } = await client.query(q, [id_usuario, id_livro, data_devolucao_prevista]);

      await client.query("COMMIT");
      return rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async devolver(id_emprestimo) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const { rows } = await client.query(`SELECT id_livro, status FROM biblioteca.emprestimo WHERE id_emprestimo = $1 FOR UPDATE`, [id_emprestimo]);
      const emprest = rows[0];
      if (!emprest) throw { status: 404, message: "Empréstimo não encontrado" };
      if (emprest.status === "devolvido") throw { status: 400, message: "Já devolvido" };

      await client.query(`UPDATE biblioteca.emprestimo SET data_devolucao_real = CURRENT_DATE, status = 'devolvido' WHERE id_emprestimo = $1`, [id_emprestimo]);
      await client.query(`UPDATE biblioteca.livro SET exemplares_disponiveis = exemplares_disponiveis + 1 WHERE id_livro = $1`, [emprest.id_livro]);
      await client.query("COMMIT");
      return { message: "Devolução registrada" };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async listByUser(id_usuario) {
    const { rows } = await pool.query(
      `SELECT e.*, l.titulo, l.autor FROM biblioteca.emprestimo e
       JOIN biblioteca.livro l ON e.id_livro = l.id_livro
       WHERE e.id_usuario = $1 ORDER BY e.data_emprestimo DESC`, [id_usuario]);
    return rows;
  },

  async findById(id_emprestimo) {
    const { rows } = await pool.query(`SELECT * FROM biblioteca.emprestimo WHERE id_emprestimo = $1`, [id_emprestimo]);
    return rows[0];
  }
};
