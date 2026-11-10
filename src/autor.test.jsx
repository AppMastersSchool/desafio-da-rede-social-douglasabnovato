import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";
import { storageEmMemoria } from "./testes/memoria.js";

const publicar = async (usuario, texto) => {
  await usuario.type(screen.getByLabelText("O que você quer compartilhar?"), texto);
  await usuario.click(screen.getByRole("button", { name: "Publicar" }));
};

describe("selecionar o autor (desafio 1)", () => {
  it("começa com o primeiro usuário e publica com o autor escolhido", async () => {
    const usuario = userEvent.setup();
    render(<App storage={storageEmMemoria()} />);
    const select = screen.getByLabelText("Publicando como");
    expect(select).toHaveDisplayValue("Ana Lima");

    await publicar(usuario, "Post da Ana");
    await usuario.selectOptions(select, "Carla Souza");
    await publicar(usuario, "Post da Carla");

    const [primeiro, segundo] = within(screen.getByRole("list", { name: "Posts" })).getAllByRole("listitem");
    expect(primeiro).toHaveTextContent("Carla Souza");
    expect(primeiro).toHaveTextContent("Post da Carla");
    expect(segundo).toHaveTextContent("Ana Lima");
  });

  it("guarda a escolha e volta com ela depois de recarregar", async () => {
    const usuario = userEvent.setup();
    const storage = storageEmMemoria();
    const { unmount } = render(<App storage={storage} />);
    await usuario.selectOptions(screen.getByLabelText("Publicando como"), "Bruno Costa");
    unmount();

    render(<App storage={storage} />);
    expect(screen.getByLabelText("Publicando como")).toHaveDisplayValue("Bruno Costa");
    expect(storage.getAutorAtual()).toBe("bruno");
  });

  // O jsdom não troca a opção do <select> nativo pelas setas; a troca por seta
  // fica no teste de navegador (Playwright). Aqui: o select é o primeiro foco.
  it("o select é o primeiro elemento focado pelo Tab", async () => {
    const usuario = userEvent.setup();
    render(<App storage={storageEmMemoria()} />);
    await usuario.tab();
    const select = screen.getByLabelText("Publicando como");
    expect(select).toHaveFocus();
    await usuario.selectOptions(select, "Bruno Costa");
    expect(select).toHaveFocus();
    expect(select).toHaveDisplayValue("Bruno Costa");
  });

  it("autor gravado que não existe mais cai no primeiro usuário", () => {
    const storage = storageEmMemoria({ "rede-social:autor": JSON.stringify("apagado") });
    render(<App storage={storage} />);
    expect(screen.getByLabelText("Publicando como")).toHaveDisplayValue("Ana Lima");
  });
});
