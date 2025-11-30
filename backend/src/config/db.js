// src/config/db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "biblioteca",
  password: process.env.DB_PASS || "postgres",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  // opcional: max connections, idle timeout
  max: 20,
  idleTimeoutMillis: 30000,
});
