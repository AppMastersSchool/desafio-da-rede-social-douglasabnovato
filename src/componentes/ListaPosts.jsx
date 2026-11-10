const formatar = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

export default function ListaPosts({ posts, vazio = "Nenhum post ainda. Que tal o primeiro?" }) {
  if (!posts.length) return <p className="vazio">{vazio}</p>;

  return (
    <ul className="posts" aria-label="Posts">
      {posts.map((post) => (
        <li key={post.id} className="cartao post">
          <p className="post-texto">{post.texto}</p>
          <time className="post-data" dateTime={post.criadoEm}>
            {formatar.format(new Date(post.criadoEm))}
          </time>
        </li>
      ))}
    </ul>
  );
}
