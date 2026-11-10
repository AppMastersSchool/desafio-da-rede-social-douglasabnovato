import { useEffect, useState } from "react";

// Rota por hash (#/perfil/<id>): funciona em qualquer hospedagem estática,
// sem configurar o servidor e sem dependência de roteador.

export const linkPerfil = (id) => `#/perfil/${encodeURIComponent(id)}`;
export const linkFeed = "#/";

/** Converte o hash em { pagina, id }. */
export function lerRota(hash) {
  const perfil = /^#\/perfil\/([^/]+)\/?$/.exec(hash);
  if (perfil) return { pagina: "perfil", id: decodeURIComponent(perfil[1]) };
  return { pagina: "feed" };
}

export function useRota() {
  const [rota, setRota] = useState(() => lerRota(window.location.hash));
  useEffect(() => {
    const atualizar = () => setRota(lerRota(window.location.hash));
    window.addEventListener("hashchange", atualizar);
    return () => window.removeEventListener("hashchange", atualizar);
  }, []);
  return rota;
}
