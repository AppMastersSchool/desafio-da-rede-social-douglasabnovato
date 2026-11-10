import { beforeEach, describe, expect, it } from "vitest";
import { Storage } from "./storage.js";

/** Armazenamento em memória com a mesma interface do localStorage. */
function memoria(inicial = {}) {
  const dados = { ...inicial };
  return {
    getItem: (k) => (k in dados ? dados[k] : null),
    setItem: (k, v) => { dados[k] = String(v); },
    dados,
  };
}

describe("Storage", () => {
  let area;
  let storage;

  beforeEach(() => {
    area = memoria();
    storage = new Storage(area);
  });

  it("getPosts devolve lista vazia quando não há nada gravado", () => {
    expect(storage.getPosts()).toEqual([]);
  });

  it("getPosts devolve lista vazia com JSON inválido ou que não é lista", () => {
    area.setItem("rede-social:posts", "{quebrado");
    expect(storage.getPosts()).toEqual([]);
    area.setItem("rede-social:posts", JSON.stringify({ nao: "lista" }));
    expect(storage.getPosts()).toEqual([]);
  });

  it("savePosts grava e getPosts lê de volta", () => {
    const posts = [{ id: "a", texto: "oi" }, { id: "b", texto: "olá" }];
    storage.savePosts(posts);
    expect(storage.getPosts()).toEqual(posts);
    expect(JSON.parse(area.dados["rede-social:posts"])).toEqual(posts);
  });

  it("getPost acha pelo id e devolve null quando não existe", () => {
    storage.savePosts([{ id: "a", texto: "oi" }]);
    expect(storage.getPost("a")).toEqual({ id: "a", texto: "oi" });
    expect(storage.getPost("x")).toBeNull();
  });

  it("savePost cria no início e atualiza pelo mesmo id", () => {
    storage.savePost({ id: "a", texto: "primeiro" });
    storage.savePost({ id: "b", texto: "segundo" });
    expect(storage.getPosts().map((p) => p.id)).toEqual(["b", "a"]);

    storage.savePost({ id: "a", texto: "editado" });
    expect(storage.getPosts()).toEqual([
      { id: "b", texto: "segundo" },
      { id: "a", texto: "editado" },
    ]);
  });

  it("usa o localStorage do navegador por padrão", () => {
    new Storage().savePost({ id: "z", texto: "no navegador" });
    expect(JSON.parse(localStorage.getItem("rede-social:posts"))).toEqual([{ id: "z", texto: "no navegador" }]);
  });
});
