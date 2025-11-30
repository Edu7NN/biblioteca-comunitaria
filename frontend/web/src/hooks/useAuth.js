import { useState } from "react";
import api from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);

  async function login(email, senha) {
    const res = await api.post("/auth/login", { email, senha });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.usuario);
    return res.data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return { user, login, logout };
}
