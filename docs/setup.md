# Setup de Desenvolvimento

## 1. Requisitos

- **Node.js** 20 LTS ou superior
- **npm** 10+ (ou pnpm)
- **Git**
- Conta **[Supabase](https://supabase.com)** (free)
- Conta **[MapTiler](https://maptiler.com)** (free — tiles + geocoding)
- (Opcional) **Vercel** ou **Cloudflare Pages** para deploy
- (Opcional) **Supabase CLI** para migrations locais

## 2. Contas e chaves

| Serviço | O que obter | Onde usar |
|---|---|---|
| Supabase | `Project URL`, `anon key`, `service_role key` | `.env` |
| MapTiler | API key | `.env` |

> A `service_role` key **nunca** vai para o front. Use só em scripts/CI.

## 3. Passo a passo

```bash
# Clonar
git clone <url-do-repo>
cd karaoke-map

# Dependências
npm install

# Variáveis de ambiente
cp .env.example .env      # preencher Supabase + MapTiler

# Rodar
npm run dev               # http://localhost:5173
```

## 4. Banco de dados (Supabase)

### Opção A — projeto na nuvem (recomendado no início)

1. Criar projeto no painel Supabase (região mais próxima).
2. Aplicar migrations (SQL Editor ou CLI).
3. Popular com `0009_seed_dev.sql`.

### Opção B — ambiente local

```bash
npm i -g supabase
supabase init
supabase start            # sobe Postgres/Auth/Storage locais
supabase db reset         # aplica migrations + seed
```

### Migrations

```bash
supabase migration new <nome>   # cria arquivo versionado
supabase db push                # aplica no projeto remoto
```

Ordem inicial em [`data-model.md`](data-model.md#6-migrations-ordem-inicial).

## 5. Variáveis de ambiente

Ver [`.env.example`](../.env.example). Regras:

- Prefixo `VITE_` = exposto ao cliente (ok para `anon` key e MapTiler).
- Sem prefixo = apenas scripts/CI (ex.: `SUPABASE_SERVICE_ROLE_KEY`).
- `.env` é ignorado pelo Git.

## 6. Scripts esperados (a criar na Fase 0)

| Script | Ação |
|---|---|
| `dev` | servidor de desenvolvimento |
| `build` | build de produção |
| `preview` | pré-visualizar build |
| `lint` | ESLint |
| `format` | Prettier |
| `typecheck` | `tsc --noEmit` |
| `test` / `test:run` | Vitest |
| `test:e2e` | Playwright |

## 7. Deploy

- **Front:** Vercel/Cloudflare Pages, configurando as `VITE_*` no painel.
- **Banco:** Supabase gerenciado; migrations via CI ou CLI.
- Detalhes em [`operations.md`](operations.md).

## 8. Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| Mapa cinza | key MapTiler ausente/inválida | conferir `VITE_MAPTILER_KEY` |
| "Invalid API key" Supabase | `.env` não carregado | reiniciar `npm run dev` |
| RLS bloqueia escrita | usuário não autenticado | logar no `/admin` |
| Geocoding vazio | endereço fora do escopo / rate limit | tentar Nominatim |
