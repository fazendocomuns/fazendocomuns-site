# Supabase — Fazendo Comuns

Migrations e configuração do backend Supabase para o projeto.

## Pré-requisitos

- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Conta no [Supabase Dashboard](https://supabase.com/dashboard)

## Projeto remoto (dev/prod)

```bash
# Na raiz do repositório
supabase login
supabase link --project-ref <SEU_PROJECT_REF>
supabase db push
```

## Desenvolvimento local

```bash
supabase start
supabase db reset   # aplica todas as migrations
```

Studio local: http://localhost:54323

## Variáveis no frontend

```bash
cd frontend
cp .env.example .env
```

Preencha após criar o projeto:

```env
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
VITE_USE_SUPABASE=false   # true quando integração estiver pronta
```

## Gerar tipos TypeScript

```bash
cd frontend
npm run supabase:types
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
| `000011` | Seed equipe (pesquisadores, assistentes, consultores, colaboradores) |
| `000012` | Seed notícias, editoriais, eventos |

## Seed da equipe

Conteúdo migrado de `frontend/src/features/projeto/data/equipeContent.ts`, `consultoresContent.ts` e `colaboradoresContent.ts`.

```bash
# 1. Sincronizar fotos para URLs estáveis (/imgs/...)
cd frontend
npm run seed:equipe

# 2. Aplicar seed no banco (na raiz do repositório)
cd ..
supabase db push
```

O seed é idempotente (upsert por `slug`). E-mails de assistentes/consultores usam placeholder `equipe+{slug}@fazendocomuns.org` — atualize no admin quando tiver os e-mails reais.

Para regenerar o SQL após editar o script gerador:

```bash
cd frontend && npm run seed:equipe:generate
```

## Seed de conteúdo editorial

```bash
cd frontend && npm run seed:content:generate
cd .. && supabase db push
```

Insere 3 notícias, 2 editoriais e 2 eventos (upsert por `slug`).

## Primeiro usuário admin

Após criar usuário no Dashboard (Authentication → Users):

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seu-email@ufrj.br';
```
