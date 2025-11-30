// src/routes/emprestimoRoutes.js
import express from "express";
import { criarEmprestimo, devolver, listarPorUsuario } from "../controllers/emprestimoController.js";
import { emprestimoValidation } from "../utils/validators.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authRequired, emprestimoValidation, criarEmprestimo);
router.put("/:id/devolver", authRequired, devolver);
router.get("/usuario/:id_usuario", authRequired, listarPorUsuario);

export default router;
