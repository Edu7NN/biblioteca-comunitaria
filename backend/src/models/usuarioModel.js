// src/models/usuarioModel.js
import { pool } from "../config/db.js";

export const Usuario = {

  async create({ nome, cpf = null, telefone = null, endereco, email, senha_hash, perfil = "leitor" }) {

    const query = `
      INSERT INTO biblioteca.usuario (nome, cpf, telefone, endereco, email, senha, perfil)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id_usuario, nome, email, perfil
    `;

    const values = [nome, cpf, telefone, endereco, email, senha_hash, perfil];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },


  async findByEmail(email) {
    const query = `
      SELECT
        id_usuario,
        nome,
        cpf,
        telefone,
        endereco,
        email,
        senha AS senha_hash,
        perfil
      FROM biblioteca.usuario
      WHERE email = $1
    `;

    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
};
