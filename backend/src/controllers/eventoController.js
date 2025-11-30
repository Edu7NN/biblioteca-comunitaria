// src/controllers/eventoController.js
import { Evento } from "../models/eventoModel.js";
import { Participacao } from "../models/participacaoModel.js";

export const createEvento = async (req, res, next) => {
  try {
    const novo = await Evento.create(req.body);
    res.status(201).json(novo);
  } catch (err) { next(err); }
};

export const listEventos = async (req, res, next) => {
  try {
    const ev = await Evento.findAll();
    res.json(ev);
  } catch (err) { next(err); }
};

export const getEvento = async (req, res, next) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ error: "Evento não encontrado" });
    res.json(evento);
  } catch (err) { next(err); }
};

export const participarEvento = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;
    const id_evento = Number(req.params.id);
    const r = await Participacao.create({ id_usuario, id_evento });
    if (!r) return res.status(400).json({ message: "Usuário já inscrito ou falha" });
    res.status(201).json({ message: "Inscrição realizada", participacao: r });
  } catch (err) { next(err); }
};

export const listarParticipantes = async (req, res, next) => {
  try {
    const participantes = await Participacao.listByEvento(Number(req.params.id));
    res.json(participantes);
  } catch (err) { next(err); }
};
