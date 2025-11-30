// src/routes/eventoRoutes.js
import express from "express";
import { createEvento, listEventos, getEvento, participarEvento, listarParticipantes } from "../controllers/eventoController.js";
import { authRequired, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listEventos);
router.get("/:id", getEvento);

// admin cria evento
router.post("/", authRequired, adminOnly, createEvento);

// inscrição por usuário autenticado
router.post("/:id/participar", authRequired, participarEvento);

// listar participantes (admin)
router.get("/:id/participantes", authRequired, adminOnly, listarParticipantes);

export default router;
