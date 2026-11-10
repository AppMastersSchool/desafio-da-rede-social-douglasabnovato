// Desafio 2: usuário é um objeto com id, nome, foto e algo mais (bio).
// Usuários fictícios do exercício. As fotos são SVG locais em public/avatares/.

const foto = (arquivo) => `${import.meta.env.BASE_URL}avatares/${arquivo}`;

export const usuarios = [
  { id: "ana", nome: "Ana Lima", foto: foto("ana.svg"), bio: "Gosta de trilhas e de café coado." },
  { id: "bruno", nome: "Bruno Costa", foto: foto("bruno.svg"), bio: "Aprendendo React aos poucos." },
  { id: "carla", nome: "Carla Souza", foto: foto("carla.svg"), bio: "Fotografia, livros e jogos de tabuleiro." },
];

/** Usuário mostrado quando o autor de um post não existe mais. */
export const usuarioRemovido = { id: "", nome: "Usuário removido", foto: foto("removido.svg"), bio: "" };

export const buscarUsuario = (id) => usuarios.find((u) => u.id === id) ?? null;

/** Autor de um post; nunca devolve null, para a tela não quebrar. */
export const autorDoPost = (post) => buscarUsuario(post.autorId) ?? usuarioRemovido;
