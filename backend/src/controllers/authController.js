// src/controllers/authController.js
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Usuario } from "../models/usuarioModel.js";

export async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nome, cpf = null, telefone = null, endereco, email, senha, perfil = "leitor" } = req.body;

    const existing = await Usuario.findByEmail(email);
    if (existing) return res.status(400).json({ error: "Email já cadastrado" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);

    const user = await Usuario.create({
      nome,
      cpf,
      telefone,
      endereco,
      email,
      senha_hash: hash,
      perfil
    });

    res.status(201).json({ message: "Usuário criado", user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // senha_hash vem do model
    const valid = await bcrypt.compare(senha, user.senha_hash);

    if (!valid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const payload = { id_usuario: user.id_usuario, perfil: user.perfil };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.json({ token, usuario: { id: user.id_usuario, nome: user.nome, email: user.email, perfil: user.perfil } });
  } catch (err) {
    console.error("LOGIN ERROR", err);
    res.status(500).json({ error: "Erro interno no login" });
  }
}
