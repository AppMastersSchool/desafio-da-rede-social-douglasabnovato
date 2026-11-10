import { useEffect, useState } from "react";

// Rota por hash (#/perfil/<id>): funciona em qualquer hospedagem estática,
// sem configurar o servidor e sem dependência de roteador.

export const linkPerfil = (id) => `#/perfil/${encodeURIComponent(id)}`;
export const linkFeed = "#/";

// "%E0" e outros códigos inválidos fazem decodeURIComponent lançar URIError.
// Nesse caso o id fica como veio: nenhum usuário tem "%" no id (linkPerfil codifica),
// então a tela cai em "Perfil não encontrado" em vez de ficar branca.
function decodificar(trecho) {
  try {
    return decodeURIComponent(trecho);
  } catch {
    return trecho;
  }
}

/** Converte o hash em { pagina, id }. */
export function lerRota(hash) {
  const perfil = /^#\/perfil\/([^/]+)\/?$/.exec(hash);
  if (perfil) return { pagina: "perfil", id: decodificar(perfil[1]) };
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
