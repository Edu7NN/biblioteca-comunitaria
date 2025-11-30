// seed_admin.js
import bcrypt from "bcryptjs";
import { pool } from "./src/config/db.js";

(async function seed(){
  const client = await pool.connect();
  try {
    const email = "admin@biblioteca.local";
    const check = await client.query("SELECT 1 FROM biblioteca.usuario WHERE email = $1", [email]);
    if (check.rowCount > 0) {
      console.log("Admin já existe.");
      return;
    }
    const senha = "admin123";
    const hash = await bcrypt.hash(senha, 10);
    await client.query(
      `INSERT INTO biblioteca.usuario (nome, cpf, telefone, endereco, email, senha, perfil)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      ["Admin Biblioteca","00000000000","859000000","Sede", email, hash, "administrador"]
    );
    console.log("Admin criado:", email, senha);
  } catch (err) {
    console.error("Erro seed:", err);
  } finally {
    client.release();
    process.exit(0);
  }
})();
