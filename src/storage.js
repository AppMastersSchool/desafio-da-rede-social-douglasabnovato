// Desafio 6: todo acesso a dados passa por esta classe.
// As telas não falam com o localStorage; só com a Storage.
// O armazenamento é injetável: nos testes, um objeto em memória.

const CHAVE_POSTS = "rede-social:posts";
const CHAVE_AUTOR = "rede-social:autor";

export class Storage {
  constructor(area = globalThis.localStorage) {
    this.area = area;
  }

  /** Lê uma chave como JSON; ausente ou inválido devolve o valor padrão. */
  ler(chave, padrao) {
    try {
      const bruto = this.area.getItem(chave);
      return bruto === null ? padrao : JSON.parse(bruto);
    } catch {
      return padrao;
    }
  }

  gravar(chave, valor) {
    this.area.setItem(chave, JSON.stringify(valor));
  }

  /** Todos os posts, na ordem gravada. */
  getPosts() {
    const posts = this.ler(CHAVE_POSTS, []);
    return Array.isArray(posts) ? posts : [];
  }

  /** Um post pelo id, ou null. */
  getPost(id) {
    return this.getPosts().find((post) => post.id === id) ?? null;
  }

  savePosts(posts) {
    this.gravar(CHAVE_POSTS, posts);
  }

  /** Cria o post (no início da lista) ou atualiza o que tem o mesmo id. */
  savePost(post) {
    const posts = this.getPosts();
    const indice = posts.findIndex((p) => p.id === post.id);
    if (indice >= 0) posts[indice] = post;
    else posts.unshift(post);
    this.savePosts(posts);
    return post;
  }

  /** Id do usuário que está publicando (desafio 1), ou null. */
  getAutorAtual() {
    const id = this.ler(CHAVE_AUTOR, null);
    return typeof id === "string" ? id : null;
  }

  saveAutorAtual(id) {
    this.gravar(CHAVE_AUTOR, id);
  }
}

/** Instância usada pelo app, sobre o localStorage do navegador. */
export const storage = new Storage();
