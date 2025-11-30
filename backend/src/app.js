// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { pool } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import livroRoutes from "./routes/livroRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// teste simples de saúde
app.get("/", (req, res) => res.send("API Biblioteca - OK"));

// testar conexao com o pool
pool.connect()
  .then(client => {
    client.release();
    console.log("✅ Conectado ao PostgreSQL");
  })
  .catch(err => console.error("❌ Erro conexão PostgreSQL:", err.message));

// montar rotas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/livros", livroRoutes);
app.use("/api/emprestimos", emprestimoRoutes);
app.use("/api/eventos", eventoRoutes);

// middleware global de erros (sempre por último)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
