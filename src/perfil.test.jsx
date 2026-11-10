import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";
import { lerRota, linkPerfil } from "./rota.js";
import { storageEmMemoria } from "./testes/memoria.js";

const irPara = (hash) =>
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

afterEach(() => {
  window.location.hash = "";
});

describe("rota", () => {
  it("lê o perfil pelo hash e cai no feed nos outros casos", () => {
    expect(lerRota("#/perfil/ana")).toEqual({ pagina: "perfil", id: "ana" });
    expect(lerRota("#/perfil/ana/")).toEqual({ pagina: "perfil", id: "ana" });
    expect(lerRota("")).toEqual({ pagina: "feed" });
    expect(lerRota("#/qualquer")).toEqual({ pagina: "feed" });
    expect(linkPerfil("bruno")).toBe("#/perfil/bruno");
  });
});

describe("perfil (desafio 3)", () => {
  it("o nome do autor no post leva ao perfil dele, com foto, nome e bio", async () => {
    const usuario = userEvent.setup();
    render(<App storage={storageEmMemoria()} />);
    await usuario.selectOptions(screen.getByLabelText("Publicando como"), "Bruno Costa");
    await usuario.type(screen.getByLabelText("O que você quer compartilhar?"), "Oi");
    await usuario.click(screen.getByRole("button", { name: "Publicar" }));

    const link = screen.getByRole("link", { name: "Bruno Costa" });
    expect(link).toHaveAttribute("href", "#/perfil/bruno");
    await irPara(link.getAttribute("href"));

    const titulo = screen.getByRole("heading", { level: 2, name: "Bruno Costa" });
    expect(titulo).toHaveFocus();
    expect(screen.getByText("Aprendendo React aos poucos.")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Bruno Costa" })).getByRole("img", { name: "Foto de Bruno Costa" })).toBeInTheDocument();
    expect(screen.queryByLabelText("O que você quer compartilhar?")).not.toBeInTheDocument();

    await irPara(screen.getByRole("link", { name: "Voltar ao feed" }).getAttribute("href"));
    expect(screen.getByLabelText("O que você quer compartilhar?")).toBeInTheDocument();
  });

  it("id inexistente mostra 'Perfil não encontrado'", async () => {
    render(<App storage={storageEmMemoria()} />);
    await irPara("#/perfil/ninguem");
    expect(screen.getByRole("heading", { name: "Perfil não encontrado" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voltar ao feed" })).toHaveAttribute("href", "#/");
  });

  it("hash com codificação inválida abre em 'Perfil não encontrado', sem tela branca", () => {
    expect(lerRota("#/perfil/%E0")).toEqual({ pagina: "perfil", id: "%E0" });
    window.location.hash = "#/perfil/%E0";
    render(<App storage={storageEmMemoria()} />);
    expect(screen.getByRole("heading", { name: "Perfil não encontrado" })).toBeInTheDocument();
  });

  it("autor removido não vira link", () => {
    const storage = storageEmMemoria({
      "rede-social:posts": JSON.stringify([{ id: "1", texto: "x", autorId: "apagado", criadoEm: "2026-11-10T12:00:00.000Z" }]),
    });
    render(<App storage={storage} />);
    expect(screen.getByText("Usuário removido").tagName).toBe("SPAN");
  });
});
