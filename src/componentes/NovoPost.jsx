import { useState } from "react";

export default function NovoPost({ onPublicar }) {
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");

  const enviar = (evento) => {
    evento.preventDefault();
    const limpo = texto.trim();
    if (!limpo) {
      setErro("Escreva algo antes de publicar.");
      return;
    }
    onPublicar(limpo);
    setTexto("");
    setErro("");
  };

  return (
    <form className="cartao novo-post" onSubmit={enviar} noValidate>
      <label htmlFor="texto-post">O que você quer compartilhar?</label>
      <textarea
        id="texto-post"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        maxLength={500}
        aria-invalid={erro ? "true" : undefined}
        aria-describedby={erro ? "erro-post" : undefined}
      />
      {erro && (
        <p id="erro-post" className="erro" role="alert">
          {erro}
        </p>
      )}
      <button type="submit">Publicar</button>
    </form>
  );
}
