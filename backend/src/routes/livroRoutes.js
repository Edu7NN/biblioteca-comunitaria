// src/routes/livroRoutes.js
import express from "express";
import { createLivro, listLivros, getLivro, updateLivro, deleteLivro } from "../controllers/livroController.js";
import { livroValidation } from "../utils/validators.js";
import { authRequired, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listLivros);
router.get("/:id", getLivro);

// rotas admin
router.post("/", authRequired, adminOnly, livroValidation, createLivro);
router.put("/:id", authRequired, adminOnly, updateLivro);
router.delete("/:id", authRequired, adminOnly, deleteLivro);

export default router;
