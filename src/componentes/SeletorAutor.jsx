import Avatar from "./Avatar.jsx";

export default function SeletorAutor({ usuarios, autor, onTrocar }) {
  return (
    <div className="seletor-autor">
      <Avatar usuario={autor} tamanho={32} />
      <label htmlFor="autor-atual">Publicando como</label>
      <select id="autor-atual" value={autor.id} onChange={(e) => onTrocar(e.target.value)}>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>
            {u.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
