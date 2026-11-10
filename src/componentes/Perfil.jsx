import { useEffect, useRef } from "react";
import { buscarUsuario } from "../usuarios.js";
import { linkFeed } from "../rota.js";
import Avatar from "./Avatar.jsx";

export default function Perfil({ id }) {
  const usuario = buscarUsuario(id);
  const titulo = useRef(null);

  // Ao abrir o perfil, o foco vai para o título: o leitor de tela anuncia a página nova
  useEffect(() => {
    titulo.current?.focus();
  }, [id]);

  if (!usuario) {
    return (
      <section className="cartao perfil" aria-labelledby="titulo-perfil">
        <h2 id="titulo-perfil" ref={titulo} tabIndex={-1}>
          Perfil não encontrado
        </h2>
        <p>Não existe usuário com esse endereço.</p>
        <a href={linkFeed}>Voltar ao feed</a>
      </section>
    );
  }

  return (
    <section className="cartao perfil" aria-labelledby="titulo-perfil">
      <a href={linkFeed}>Voltar ao feed</a>
      <div className="perfil-cabecalho">
        <Avatar usuario={usuario} tamanho={96} />
        <div>
          <h2 id="titulo-perfil" ref={titulo} tabIndex={-1}>
            {usuario.nome}
          </h2>
          <p className="perfil-bio">{usuario.bio}</p>
        </div>
      </div>
    </section>
  );
}
