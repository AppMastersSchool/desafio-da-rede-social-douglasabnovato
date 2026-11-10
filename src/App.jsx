import { useState } from "react";
import { storage as storagePadrao } from "./storage.js";
import NovoPost from "./componentes/NovoPost.jsx";
import ListaPosts from "./componentes/ListaPosts.jsx";
import SeletorAutor from "./componentes/SeletorAutor.jsx";
import Perfil from "./componentes/Perfil.jsx";
import { buscarUsuario, usuarios } from "./usuarios.js";
import { useRota } from "./rota.js";

const novoId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function App({ storage = storagePadrao }) {
  const rota = useRota();
  const [posts, setPosts] = useState(() => storage.getPosts());
  // Desafio 1: o autor escolhido no topo assina os posts novos
  const [autor, setAutor] = useState(() => buscarUsuario(storage.getAutorAtual()) ?? usuarios[0]);

  const trocarAutor = (id) => {
    const escolhido = buscarUsuario(id);
    if (!escolhido) return;
    storage.saveAutorAtual(escolhido.id);
    setAutor(escolhido);
  };

  const publicar = (texto) => {
    storage.savePost({ id: novoId(), texto, autorId: autor.id, criadoEm: new Date().toISOString() });
    setPosts(storage.getPosts());
  };

  return (
    <>
      <header className="topo">
        <div>
          <h1>Rede Social</h1>
          <p className="subtitulo">Desafio do treinamento React para Humanos</p>
        </div>
        <SeletorAutor usuarios={usuarios} autor={autor} onTrocar={trocarAutor} />
      </header>
      <main id="conteudo" className="conteudo">
        {rota.pagina === "perfil" ? (
          <Perfil id={rota.id} posts={posts} />
        ) : (
          <>
            <NovoPost onPublicar={publicar} />
            <ListaPosts posts={posts} />
          </>
        )}
      </main>
    </>
  );
}
