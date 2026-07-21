# Fazendo Comuns — Next.js (migração)

Versão Next.js do site, construída em paralelo ao `frontend/` (Vite). Foco em SEO com renderização no servidor.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + Shadcn/UI + Radix UI
- Supabase (conteúdo dinâmico)
- Framer Motion + Lenis

## Desenvolvimento

```bash
cd web
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

O site Vite continua em `../frontend` na porta 5173.

## Variáveis de ambiente

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL base do site |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon (pública) |
| `NEXT_PUBLIC_USE_SUPABASE` | `true` para buscar dados do Supabase; `false` usa conteúdo estático |

## Rotas migradas

- `/` — home completa com SSR + ISR
- `/noticias` e `/noticias/[slug]`
- `/editoriais` e `/editoriais/[slug]`
- `/livros` e `/livros/[slug]` (com JSON-LD Book)
- `/sitemap.xml` — sitemap dinâmico
- `/robots.txt` — robots dinâmico

## Estrutura

```
src/
├── app/              → Rotas Next.js (App Router)
├── components/       → UI, layout, shared (copiado do frontend)
├── features/         → Domínios (sem admin por enquanto)
├── integrations/     → Repositórios Supabase
├── lib/              → Utilitários, SEO, content server
└── types/            → Tipos + database.ts
```

## Próximos passos

1. Migrar home, editoriais, livros
2. Redirects legados no `next.config.ts`
3. Migrar admin como client routes com `noindex`
4. Deploy e cutover de produção
