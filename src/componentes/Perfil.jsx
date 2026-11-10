import { useEffect, useRef } from "react";
import { buscarUsuario } from "../usuarios.js";
import { linkFeed } from "../rota.js";
import Avatar from "./Avatar.jsx";
import ListaPosts from "./ListaPosts.jsx";

export default function Perfil({ id, posts = [] }) {
  const usuario = buscarUsuario(id);
  const titulo = useRef(null);

  // Ao abrir o perfil, o foco vai para o título: o leitor de tela anuncia a página nova
  useEffect(() => {
    titulo.current?.focus();
  }, [id]);

  // Desafio 5: só os posts deste usuário, do mais novo para o mais antigo
  const dele = usuario
    ? posts.filter((p) => p.autorId === usuario.id).sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))
    : [];
  const total = dele.length;

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
          <p className="perfil-total">{total === 1 ? "1 post" : `${total} posts`}</p>
        </div>
      </div>
      <ListaPosts posts={dele} rotulo={`Posts de ${usuario.nome}`} vazio="Este usuário ainda não publicou." />
    </section>
  );
}
