import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Erro ao carregar perfil", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Meu Perfil</h1>

      <div className={styles.card}>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tipo:</strong> {user.tipo}</p>
      </div>
    </div>
  );
}
