# Site — Ponto de Equilíbrio Pilates by Susy Aguiar

React + Vite + TypeScript + Tailwind CSS v4 · React Router · GSAP + ScrollTrigger (`@gsap/react`) · Lenis · Lucide.

## Rodar

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # gera /dist (checa tipos antes)
npm run build:preview  # versão com rotas em hash, para hospedar em subpasta
```

Publicação: `vercel.json` (Vercel) e `public/_redirects` (Netlify) já configurados.

## Onde editar

- **Todos os dados do estúdio:** `src/data/empresa.ts` (contatos, horários, modalidades, aparelhos, galeria, avaliações, perguntas, agenda).
- **Domínio:** `empresa.ts`, `index.html`, `public/robots.txt` e `public/sitemap.xml`.
- **Cores e fontes:** bloco `@theme` em `src/index.css` (Unbounded + Archivo; verde-menta da marca).
- **Fotos:** `public/images/` — todas recebem o mesmo tratamento de cor (`.photo-grade`).

## Páginas

Início · O estúdio (história, valores, equipe, estrutura e galeria) · Modalidades + 4 páginas individuais ·
Planos e horários (com agenda de aula experimental) · Dúvidas · Contato · Política de Privacidade · 404.

## Agenda de aula experimental

`src/components/Agenda.tsx` + `src/lib/agenda.ts`, configurada em `empresa.agenda`. Gera horários só dentro do
expediente, no fuso de Brasília, e abre o pedido no WhatsApp. Não sabe quais horários estão ocupados
(não há servidor); o estúdio confirma pelo WhatsApp.

## Pendências [CONFIRMAR]

Procure `CONFIRMAR` no projeto. Principais:

1. Dias e horário de abertura (o Google só informa "fecha 20:30"), duração da aula e horários de turma (agenda).
2. Lista de modalidades: "Pilates nos aparelhos" é certo pelas fotos; postura e dores, gestantes e maturidade precisam ser validadas.
3. Valores e frequências dos planos, aula experimental gratuita ou paga, regra de reposição, formas de pagamento.
4. Número de alunas por turma.
5. Ano de fundação (uma aluna fala em "quase duas décadas"), confirmar mudança para o espaço novo em janeiro de 2023.
6. Equipe: nomes, formação/registro e retratos (espaços reservados na página O estúdio).
7. Estacionamento, elevador/acessibilidade da Torre A, exigência de atestado.
8. E-mail, Instagram, CPF/CNPJ e prazo de retenção de dados (Política de Privacidade).
9. Coordenadas (lat/lng) para o JSON-LD e domínio definitivo.
10. Nota individual das 3 avaliações (a média é 5,0 em 43; exibidas com 5 estrelas).
