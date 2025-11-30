// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Verifica se há um token JWT válido no header Authorization: Bearer <token>
 * Se válido => adiciona req.user = payload (id_usuario, perfil, iat, exp)
 */
export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token não informado" });
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Token mal formatado" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

/**
 * Garante que o usuário autenticado é administrador
 */
export function adminOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Não autenticado" });
  if (req.user.perfil !== "administrador") return res.status(403).json({ error: "Acesso de administrador exigido" });
  next();
}
