import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";
import { storageEmMemoria } from "./testes/memoria.js";

describe("App", () => {
  it("mostra o título da rede social", () => {
    render(<App storage={storageEmMemoria()} />);
    expect(screen.getByRole("heading", { level: 1, name: "Rede Social" })).toBeInTheDocument();
  });
});

describe("Feed", () => {
  it("mostra a mensagem de vazio quando não há posts", () => {
    render(<App storage={storageEmMemoria()} />);
    expect(screen.getByText("Nenhum post ainda. Que tal o primeiro?")).toBeInTheDocument();
  });

  it("publica um post e mostra no topo, com data", async () => {
    const usuario = userEvent.setup();
    render(<App storage={storageEmMemoria()} />);
    const campo = screen.getByLabelText("O que você quer compartilhar?");

    await usuario.type(campo, "Primeiro post");
    await usuario.click(screen.getByRole("button", { name: "Publicar" }));
    await usuario.type(campo, "Segundo post");
    await usuario.click(screen.getByRole("button", { name: "Publicar" }));

    const itens = within(screen.getByRole("list", { name: "Posts" })).getAllByRole("listitem");
    expect(itens.map((li) => li.querySelector(".post-texto").textContent)).toEqual(["Segundo post", "Primeiro post"]);
    expect(itens[0].querySelector("time")).toHaveAttribute("datetime");
    expect(campo).toHaveValue("");
  });

  it("não publica texto vazio e mostra o aviso", async () => {
    const usuario = userEvent.setup();
    render(<App storage={storageEmMemoria()} />);
    await usuario.type(screen.getByLabelText("O que você quer compartilhar?"), "   ");
    await usuario.click(screen.getByRole("button", { name: "Publicar" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Escreva algo antes de publicar.");
    expect(screen.getByLabelText("O que você quer compartilhar?")).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByRole("list", { name: "Posts" })).not.toBeInTheDocument();
  });

  it("mantém os posts depois de recarregar (mesma Storage)", async () => {
    const usuario = userEvent.setup();
    const storage = storageEmMemoria();
    const { unmount } = render(<App storage={storage} />);
    await usuario.type(screen.getByLabelText("O que você quer compartilhar?"), "Fica salvo");
    await usuario.click(screen.getByRole("button", { name: "Publicar" }));
    unmount();

    render(<App storage={storage} />);
    expect(screen.getByText("Fica salvo")).toBeInTheDocument();
  });
});
