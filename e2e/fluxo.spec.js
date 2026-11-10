// Fluxo dos desafios no navegador: autor → post com foto → perfil com o post → feed.
// Com axe (WCAG 2.1 A e AA) no feed e no perfil, e teclado com foco visível.
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const semViolacoes = async (page) => {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const resumo = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
  expect(resumo, resumo.join("\n")).toEqual([]);
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("escolher o autor, publicar, abrir o perfil e voltar", async ({ page }) => {
  await expect(page.getByText("Nenhum post ainda. Que tal o primeiro?")).toBeVisible();
  await semViolacoes(page);

  await page.getByLabel("Publicando como").selectOption({ label: "Carla Souza" });
  await page.getByLabel("O que você quer compartilhar?").fill("Meu primeiro post no desafio");
  await page.getByRole("button", { name: "Publicar" }).click();

  const post = page.getByRole("list", { name: "Posts" }).getByRole("listitem").first();
  await expect(post).toContainText("Meu primeiro post no desafio");
  const foto = post.getByRole("img", { name: "Foto de Carla Souza" });
  await expect(foto).toBeVisible();
  expect(await foto.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  await semViolacoes(page);

  await post.getByRole("link", { name: "Carla Souza" }).click();
  await expect(page).toHaveURL(/#\/perfil\/carla$/);
  await expect(page.getByRole("heading", { level: 2, name: "Carla Souza" })).toBeFocused();
  await expect(page.getByRole("list", { name: "Posts de Carla Souza" })).toContainText("Meu primeiro post no desafio");
  await expect(page.getByText("1 post", { exact: true })).toBeVisible();
  await semViolacoes(page);

  await page.getByRole("link", { name: "Voltar ao feed" }).click();
  await expect(page.getByLabel("O que você quer compartilhar?")).toBeVisible();

  // Os dados ficam no navegador: recarregar mantém o post e o autor
  await page.reload();
  await expect(page.getByLabel("Publicando como")).toHaveValue("carla");
  await expect(page.getByText("Meu primeiro post no desafio")).toBeVisible();
});

test("perfil inexistente e perfil vazio passam no axe", async ({ page }) => {
  await page.goto("/#/perfil/ninguem");
  await expect(page.getByRole("heading", { name: "Perfil não encontrado" })).toBeVisible();
  await semViolacoes(page);

  await page.goto("/#/perfil/bruno");
  await expect(page.getByText("Este usuário ainda não publicou.")).toBeVisible();
  await semViolacoes(page);
});

test("teclado: Tab chega ao select, ao campo e ao botão, com foco visível", async ({ page }) => {
  const contorno = (loc) => loc.evaluate((el) => {
    const s = getComputedStyle(el);
    return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
  });

  await page.keyboard.press("Tab");
  const select = page.getByLabel("Publicando como");
  await expect(select).toBeFocused();
  expect(await contorno(select)).toBe(true);
  await page.keyboard.press("ArrowDown");
  await expect(select).toHaveValue("bruno");

  await page.keyboard.press("Tab");
  const campo = page.getByLabel("O que você quer compartilhar?");
  await expect(campo).toBeFocused();
  expect(await contorno(campo)).toBe(true);
  await page.keyboard.type("Publicado só com teclado");

  await page.keyboard.press("Tab");
  const botao = page.getByRole("button", { name: "Publicar" });
  await expect(botao).toBeFocused();
  expect(await contorno(botao)).toBe(true);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("list", { name: "Posts" })).toContainText("Bruno Costa");
});
