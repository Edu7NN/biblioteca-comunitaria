// src/controllers/usuarioController.js
import { Usuario } from "../models/usuarioModel.js";

export const listUsuarios = async (req, res, next) => {
  try {
    const users = await Usuario.listAll();
    res.json(users);
  } catch (err) { next(err); }
};

export const getUsuario = async (req, res, next) => {
  try {
    const user = await Usuario.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  } catch (err) { next(err); }
};
