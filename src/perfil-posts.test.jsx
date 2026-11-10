import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Perfil from "./componentes/Perfil.jsx";

const posts = [
  { id: "1", texto: "Ana antigo", autorId: "ana", criadoEm: "2026-11-08T10:00:00.000Z" },
  { id: "2", texto: "Bruno", autorId: "bruno", criadoEm: "2026-11-09T10:00:00.000Z" },
  { id: "3", texto: "Ana novo", autorId: "ana", criadoEm: "2026-11-10T10:00:00.000Z" },
];

describe("posts no perfil (desafio 5)", () => {
  it("mostra só os posts do usuário, mais novos primeiro, e o total", () => {
    render(<Perfil id="ana" posts={posts} />);
    const lista = screen.getByRole("list", { name: "Posts de Ana Lima" });
    const textos = within(lista).getAllByRole("listitem").map((li) => li.querySelector(".post-texto").textContent);
    expect(textos).toEqual(["Ana novo", "Ana antigo"]);
    expect(screen.getByText("2 posts")).toBeInTheDocument();
    expect(screen.queryByText("Bruno")).not.toBeInTheDocument();
  });

  it("perfil sem posts mostra a mensagem de vazio", () => {
    render(<Perfil id="carla" posts={posts} />);
    expect(screen.getByText("Este usuário ainda não publicou.")).toBeInTheDocument();
    expect(screen.getByText("0 posts")).toBeInTheDocument();
  });

  it("um post usa o singular", () => {
    render(<Perfil id="bruno" posts={posts} />);
    expect(screen.getByText("1 post")).toBeInTheDocument();
  });
});
