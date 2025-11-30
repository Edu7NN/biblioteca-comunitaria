// src/controllers/emprestimoController.js
import { Emprestimo } from "../models/emprestimoModel.js";

export const criarEmprestimo = async (req, res, next) => {
  try {
    const { id_usuario, id_livro, data_devolucao_prevista } = req.body;
    const registro = await Emprestimo.create({ id_usuario, id_livro, data_devolucao_prevista });
    res.status(201).json(registro);
  } catch (err) { next(err); }
};

export const devolver = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Emprestimo.devolver(id);
    res.json(result);
  } catch (err) { next(err); }
};

export const listarPorUsuario = async (req, res, next) => {
  try {
    const idU = req.params.id_usuario;
    const rows = await Emprestimo.listByUser(idU);
    res.json(rows);
  } catch (err) { next(err); }
};
