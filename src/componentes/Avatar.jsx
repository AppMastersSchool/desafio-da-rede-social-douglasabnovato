export default function Avatar({ usuario, tamanho = 40 }) {
  return (
    <img
      className="avatar"
      src={usuario.foto}
      alt={`Foto de ${usuario.nome}`}
      width={tamanho}
      height={tamanho}
    />
  );
}
