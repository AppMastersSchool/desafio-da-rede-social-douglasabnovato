# Desafio da Rede Social · React

Exercício do treinamento **React para Humanos** (UFJF, 4º trimestre de 2018): uma rede social simples, com posts, autores e perfis, guardada no navegador.

> **É um exercício de curso.** Não tem usuário real, servidor nem hospedagem. Os dados ficam no `localStorage` do seu navegador, e os 3 usuários são fictícios. No portfólio, conta como nível N1 (estudo).

## Situação dos desafios

| # | Desafio | Situação | Onde está no código |
|---|---|---|---|
| 1 | Selecionar o autor no alto da página | Feito | `src/componentes/SeletorAutor.jsx` |
| 2 | Usuário como objeto (id, nome, foto e bio); foto nos posts e no perfil | Feito | `src/usuarios.js`, `src/componentes/Avatar.jsx`, `public/avatares/` |
| 3 | Clicar no autor abre a rota de perfil | Feito | `src/rota.js` (rota por hash `#/perfil/<id>`), `src/componentes/Perfil.jsx` |
| 4 | Componentes visuais de terceiros (Material UI) | Não feito: decisão aberta na issue #11 | — |
| 5 | Perfil com os posts do usuário | Feito | `src/componentes/Perfil.jsx` |
| 6 | Classe `Storage` para todo acesso a dados | Feito | `src/storage.js` (as telas não usam `localStorage`) |

Base comum: o feed (`src/componentes/NovoPost.jsx` e `ListaPosts.jsx`) com aviso para post vazio e mensagem de feed vazio.

## Como rodar

Pré-requisito: Node.js 20 ou mais recente.

```bash
npm ci
npm run dev        # http://localhost:5173/
npm run lint       # ESLint
npm test           # testes de componente (Vitest + Testing Library)
npm run build      # gera dist/
npm run preview    # serve o dist/
npx playwright install chromium   # uma vez
npm run test:e2e   # fluxo no navegador com axe (Playwright)
```

O GitHub Actions roda lint, testes, build e Playwright em cada PR.

## Fora do escopo

- **Desafio 4 (Material UI):** traz dezenas de pacotes para um app de poucos componentes; a escolha da biblioteca está na issue #11.
- **Servidor, login e cadastro de usuários:** o exercício pede dados no navegador.
- **Curtidas, comentários e upload de foto:** não fazem parte dos 6 desafios.
- **Publicação:** não é obrigatória num exercício. O `dist/` funciona em qualquer hospedagem estática (`base: "./"` e rota por hash).

## Instruções originais do treinamento (2018)

### Desafio da Rede Social - UFJF
Desafio para participantes do treinamento React para Humanos - q4-2018

### Instruções

- Clone este repositório para sua máquina
- Desenvolva seu projeto (utilize como base seu código ou o [repositório do Baraky](https://github.com/jfbaraky/Treinamento-React-UFJF)
- Ao final atualize o repositório com seu código desenvolvido

### Desafios

Como proposto em aula, apresentamos o desafio em 6 etapas. Se você concluir ao menos 2 destes, poderá participar do encontro de segunda-feira, dia 17. São eles:

1 - Poder selecionar um usuário através de algum elemento visual no alto da página (pode ser um select). Uma vez selecionado, ele passa a ser o autor dos novos posts;  
2 - Usuário ser um objeto com id, nome, foto (url) e algo mais. Exibir a foto dele nos posts e no perfil;  
3 - Ao clicar no nome do autor do post, abrir uma rota de perfil dele (certamente será necessário ter um id único por autor);  
4 - Usar componentes visuais de terceiros, para deixar a aplicação mais legal. Usaremos o Material UI na sexta, mas pode incluir outros;  
5 - Perfil do usuário exibir os posts dele;  
6 - Mover todo acesso a dados para uma classe Storage, que terá métodos como .getPosts(), getPost(id), savePosts(posts), savePost(post), e assim ao longo das views não ter mais referência ao localstorage, só referências a nova class Storage.

O prazo pra você enviar o projeto devolta pra este seu repositório é 17 as 5h da manhã. :)

Os alunos que enviarem, receberão antes das 12h de do dia 17 um email de convite confirmando o encontro. 
