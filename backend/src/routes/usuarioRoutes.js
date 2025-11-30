// src/routes/usuarioRoutes.js
import express from "express";
import { listUsuarios, getUsuario } from "../controllers/usuarioController.js";
import { authRequired, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// listar usuários (apenas admin)
router.get("/", authRequired, adminOnly, listUsuarios);

// obter dados de um usuário (qualquer autenticado)
router.get("/:id", authRequired, getUsuario);

export default router;
