import { useState } from "react";
import { storage as storagePadrao } from "./storage.js";
import NovoPost from "./componentes/NovoPost.jsx";
import ListaPosts from "./componentes/ListaPosts.jsx";

const novoId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function App({ storage = storagePadrao }) {
  const [posts, setPosts] = useState(() => storage.getPosts());

  const publicar = (texto) => {
    storage.savePost({ id: novoId(), texto, criadoEm: new Date().toISOString() });
    setPosts(storage.getPosts());
  };

  return (
    <>
      <header className="topo">
        <h1>Rede Social</h1>
        <p className="subtitulo">Desafio do treinamento React para Humanos</p>
      </header>
      <main id="conteudo" className="conteudo">
        <NovoPost onPublicar={publicar} />
        <ListaPosts posts={posts} />
      </main>
    </>
  );
}
