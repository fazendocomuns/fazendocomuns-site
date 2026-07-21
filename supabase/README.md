# Supabase — Fazendo Comuns

Migrations e configuração do backend Supabase para o projeto.

## Pré-requisitos

- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Conta no [Supabase Dashboard](https://supabase.com/dashboard)

## Projeto remoto (dev/prod)

Na raiz do repositório:

```bash
supabase login
supabase link --project-ref <SEU_PROJECT_REF>
supabase db push
```

Para empurrar também as URLs de Auth definidas em `config.toml`:

```bash
supabase config push
```

## Desenvolvimento local

```bash
supabase start
supabase db reset   # aplica todas as migrations
```

Studio local: http://localhost:54323

## Variáveis no frontend (Next.js)

```bash
cd web
cp .env.example .env
```

Preencha após criar o projeto (Project Settings → API):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
NEXT_PUBLIC_USE_SUPABASE=false   # true quando integração estiver pronta
```

Na Vercel (Root Directory = `web`), use as mesmas variáveis com `NEXT_PUBLIC_SITE_URL` apontando para a URL pública.

## Auth URLs

Em Authentication → URL Configuration (ou via `config.toml` + `supabase config push`):

- Site URL: `http://localhost:3000` (dev) / URL de produção depois
- Redirect URLs: localhost + domínio Vercel (`https://fazendocomuns.vercel.app`, etc.)

## Gerar tipos TypeScript

```bash
cd web
npx supabase gen types typescript --linked > src/types/database.ts
```

## Migrations

| Arquivo | Conteúdo |
|---------|----------|
| `000001` | Enums, helpers, `is_admin()` |
| `000002` | `profiles` + trigger auth |
| `000003` | Equipe (4 tabelas) |
| `000004` | Notícias, editoriais, eventos |
| `000005` | Galerias, vídeos, podcast |
| `000006` | Livros, parceiros |
| `000007` | Mídia, contato, log |
| `000008` | `paginas_conteudo` |
| `000009` | Políticas RLS |
| `000010` | Buckets Storage + políticas |
| `000011` | Seed equipe |
| `000012` | Seed notícias, editoriais, eventos |
| `000013` | Seed restante |
| `000014` | Seed completo |

Os seeds são idempotentes (upsert por `slug`).

## Primeiro usuário admin

Após criar usuário no Dashboard (Authentication → Users) ou via Auth Admin API:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seu-email@exemplo.com';
```

Login local: http://localhost:3000/admin/login  
(com `NEXT_PUBLIC_USE_SUPABASE=true` no `web/.env`)
