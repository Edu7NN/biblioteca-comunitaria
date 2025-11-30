// src/utils/validators.js
import { body } from "express-validator";

export const registerValidation = [
  body("nome").isLength({ min: 3 }),
  body("cpf").isLength({ min: 11 }).withMessage("CPF inválido"),
  body("email").isEmail(),
  body("senha").isLength({ min: 6 }),
];

export const loginValidation = [
  body("email").isEmail(),
  body("senha").exists(),
];

export const livroValidation = [
  body("titulo").notEmpty(),
  body("autor").notEmpty(),
  body("exemplares_total").isInt({ min: 0 }),
];

export const emprestimoValidation = [
  body("id_usuario").isInt(),
  body("id_livro").isInt(),
  body("data_devolucao_prevista").isISO8601(),
];
