# Operações

Deploy, observabilidade, revalidação e custos.

## 1. Ambientes

| Ambiente | Front | Banco | Dados |
|---|---|---|---|
| Local | `npm run dev` | Supabase dev | seed fictício |
| Produção | Vercel/Cloudflare Pages | Supabase prod | curadoria real |

## 2. Deploy

### Frontend (Vercel ou Cloudflare Pages)

1. Conectar o repositório.
2. Build: `npm run build` · Output: `dist`.
3. Definir variáveis `VITE_*` no painel do provedor.
4. Deploy em cada push na `main`; previews em PRs.

### Banco (Supabase)

- Migrations aplicadas via CLI (`supabase db push`) ou CI.
- **Nunca** editar produção manualmente sem gerar migration correspondente.

## 3. Variáveis por ambiente

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MAPTILER_KEY` (cliente).
- `SUPABASE_SERVICE_ROLE_KEY` apenas em CI/scripts seguros — **nunca** no front.

## 4. Backup e recuperação

- Supabase free tier: backups automáticos limitados → **exportar periodicamente**.
- Rotina sugerida: `pg_dump` mensal (ou export CSV) armazenado fora do provedor.
- Testar restauração pelo menos uma vez por trimestre.

## 5. Observabilidade (mínimo viável)

- **Erros de front:** Sentry (free tier) ou logs do provedor.
- **Supabase:** monitor de queries lentas e uso de recursos no painel.
- **Uptime:** checagem externa simples (ex.: UptimeRobot free) na home.
- **Métricas de produto:** contagem de bares ativos, cliques em "aberto agora".

## 6. Revalidação de dados

- **Frequência:** trimestral (manual no MVP).
- **Sinais:** bar ativo no Google Maps; perfil/Instagram ativo; sem indício de fechamento.
- **Ação:** atualizar `last_verified_at`; se sinais falharem → `status='suspect'` → revisão.

## 7. Custos (free tier)

| Serviço | Free tier | Risco |
|---|---|---|
| Supabase | 0,5 GB DB, Storage, Auth | estourar storage (fotos) |
| Vercel/Cloudflare | bandwidth generoso | OK p/ poucos assets |
| MapTiler | cota mensal de tiles/geocoding | estouro se tráfego alto |
| GitHub Actions | 2000 min (privado) / ilimitado (público) | baixo |

**Plano B:** US$ 15–30/mês se necessário (fora do objetivo atual — orçamento-alvo US$ 0).

## 8. Runbook — incidentes comuns

| Incidente | Ação |
|---|---|
| Mapa não carrega | verificar cota/key MapTiler; fallback de estilo |
| Erros de RLS em produção | revisar policies; testar papel `anon`/`authenticated` |
| Bar incorreto reportado | corrigir via `/admin`; registrar em `removal_requests` |
| Vazamento de chave | rotacionar no provedor; revisar logs |
| Free tier estourando | reduzir fotos (comprimir), revisar cota de tiles |


## 9. Storage (fotos)

- **Bucket recomendado:** `bar-media` (Supabase Storage). 
- Público com cuidado: preferir URLs assinadas ou políticas RLS por caminho.
- Upload via painel admin (Server Actions) — Fase 1.
- Cloudflare R2 é alternativa caso Supabase Storage atinja limites (não necessário no MVP).
