import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { autorDoPost, buscarUsuario, usuarios } from "./usuarios.js";
import ListaPosts from "./componentes/ListaPosts.jsx";

describe("usuários (desafio 2)", () => {
  it("cada usuário tem id único, nome, foto e bio", () => {
    const ids = usuarios.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const u of usuarios) {
      expect(u).toEqual(expect.objectContaining({ id: expect.any(String), nome: expect.any(String), bio: expect.any(String) }));
      expect(u.foto).toMatch(/avatares\/[a-z]+\.svg$/);
    }
  });

  it("buscarUsuario acha pelo id e devolve null quando não existe", () => {
    expect(buscarUsuario("bruno").nome).toBe("Bruno Costa");
    expect(buscarUsuario("ninguem")).toBeNull();
  });

  it("autor inexistente vira 'Usuário removido'", () => {
    expect(autorDoPost({ autorId: "apagado" }).nome).toBe("Usuário removido");
  });

  it("o post mostra a foto (com alt) e o nome do autor", () => {
    const posts = [
      { id: "1", texto: "Oi", autorId: "carla", criadoEm: "2026-11-10T12:00:00.000Z" },
      { id: "2", texto: "Antigo", autorId: "apagado", criadoEm: "2026-11-09T12:00:00.000Z" },
    ];
    render(<ListaPosts posts={posts} />);
    expect(screen.getByRole("img", { name: "Foto de Carla Souza" })).toHaveAttribute("src", expect.stringMatching(/carla\.svg$/));
    expect(screen.getByText("Carla Souza")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Foto de Usuário removido" })).toBeInTheDocument();
  });
});
