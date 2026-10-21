# Site do CEFON Centro Fonoaudiológico

Página única com rolagem + Política de Privacidade. Astro, Tailwind CSS 4 e GSAP.

## Comandos

| Comando           | O que faz                                                        |
| :---------------- | :--------------------------------------------------------------- |
| `npm install`     | Instala as dependências                                          |
| `npm run dev`     | Servidor local em `localhost:4321`                               |
| `npm run build`   | Gera o site final em `dist/`                                     |
| `npm run preview` | Abre o site final localmente (use este para medir o Lighthouse)  |
| `npm run assets`  | Regera favicon, ícones, `logo.png` e `og-image.png` a partir do logo |

## Onde editar o conteúdo

| Arquivo                        | Conteúdo                                                    |
| :----------------------------- | :---------------------------------------------------------- |
| `src/data/clinica.ts`          | Nome, endereço, telefone, horário, WhatsApp, responsável técnica, links do mapa |
| `src/data/servicos.ts`         | Exames e serviços (nome + uma frase)                        |
| `src/data/profissionais.ts`    | Profissionais (nome, CRFa, área, foto)                      |
| `src/data/logo.ts`             | Desenho do logo em SVG                                      |
| `src/components/sections/`     | Textos e layout de cada seção                               |
| `src/pages/politica-de-privacidade.astro` | Texto da política                                |

Procure por `PENDENTE` no código para ver tudo o que depende da cliente.

## Decisões

- **Mapa do Google** só carrega quando a pessoa toca em "Mostrar mapa". Deixa o site leve e evita enviar dados ao Google sem ação da pessoa (LGPD).
- **Animações** (GSAP) ficam só no topo e na entrada das seções, e são desligadas para quem ativou "reduzir movimento" no aparelho.
- **Fontes** (Outfit e Figtree) são servidas pelo próprio site, só com o subconjunto latino.
- **Sem cookies e sem estatísticas**: por isso não há aviso de cookies.
