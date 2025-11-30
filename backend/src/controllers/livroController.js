// src/controllers/livroController.js
import { validationResult } from "express-validator";
import { Livro } from "../models/livroModel.js";

export const createLivro = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const novo = await Livro.create(req.body);
    res.status(201).json(novo);
  } catch (err) { next(err); }
};

export const listLivros = async (req, res, next) => {
  try {
    const livros = await Livro.findAll({ search: req.query.q });
    res.json(livros);
  } catch (err) { next(err); }
};

export const getLivro = async (req, res, next) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ error: "Livro não encontrado" });
    res.json(livro);
  } catch (err) { next(err); }
};

export const updateLivro = async (req, res, next) => {
  try {
    const atualizado = await Livro.update(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) { next(err); }
};

export const deleteLivro = async (req, res, next) => {
  try {
    await Livro.remove(req.params.id);
    res.json({ message: "Livro removido" });
  } catch (err) { next(err); }
};
