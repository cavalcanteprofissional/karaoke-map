# TODO — Karaokê Map

Lista viva de tarefas de implementação. Alinhada ao roadmap (`docs/roadmap.md`).
Marcar `[x]` apenas quando **implementado e verificado** (teste/lint passando).

Legenda: `[ ]` pendente · `[~]` em andamento · `[x]` concluído · `[!]` bloqueado

---

## ✅ Documentação (antes de codar)

- [x] `README.md`
- [x] `CHANGELOG.md`
- [x] `TODO.md`
- [x] `CONTRIBUTING.md`
- [x] `SECURITY.md`
- [x] `.gitignore`
- [x] `.env.example`
- [x] `docs/architecture.md`
- [x] `docs/data-model.md`
- [x] `docs/design-system.md`
- [x] `docs/testing.md`
- [x] `docs/setup.md`
- [x] `docs/lgpd.md`
- [x] `docs/roadmap.md`
- [x] `docs/operations.md`
- [x] `docs/scraping.md`
- [x] `docs/decisions.md`

## Fase 0 — Fundação

### Projeto e qualidade
- [ ] Inicializar projeto Vite + React + TypeScript
- [ ] Configurar ESLint + Prettier + editorconfig
- [ ] Configurar Vitest + Testing Library
- [ ] Configurar Playwright (e2e)
- [ ] CI no GitHub Actions: install → lint → typecheck → test → build

### Supabase
- [ ] Criar projeto no Supabase (região mais próxima: `sa-east-1` se disponível)
- [ ] Migration inicial: enums (`bar_status`, `karaoke_type`, `removal_type`, …)
- [ ] Migration: `bars`, `bar_hours`, `bar_events`, `bar_sources`, `bar_media`
- [ ] Migration: `removal_requests`
- [ ] Habilitar RLS + policies (leitura pública só `active` e `opt_out=false`; escrita admin)
- [ ] Seed de desenvolvimento (3 bares fictícios)
- [ ] Testes SQL das regras críticas (overnight, RLS)

### Frontend (skeleton)
- [ ] Cliente `supabase-js` + tipagem gerada (`supabase gen types`)
- [ ] Mapa MapLibre centralizado em Fortaleza (fallback)
- [ ] Configurar i18next (PT/EN) + detecção de idioma
- [ ] Página estática de Política de Remoção (PT/EN)
- [ ] Protótipo de 1 dia: globo-intro (validar perf) **ou** decidir corte (ver ADR-002)

## Fase 1 — Admin + ground truth

- [ ] Login admin (Supabase Auth, conta única)
- [ ] Rota protegida `/admin`
- [ ] CRUD de bares (criar/editar/desativar)
- [ ] CRUD de horários (`bar_hours`) com regra overnight
- [ ] CRUD de eventos (`bar_events`) com âncora/intervalo
- [ ] Upload de fotos (Supabase Storage) + `bar_media`
- [ ] Gestão de `bar_sources`
- [ ] Botão/estado `opt_out`
- [ ] Cadastro manual de 10–15 bares reais
- [ ] Testes e2e do fluxo de cadastro

## Fase 2 — Front público

- [ ] Busca de endereço (geocoding)
- [ ] "Usar minha localização" (Geolocation API)
- [ ] Pins por bar + clustering (se necessário)
- [ ] Cards laterais ordenados por distância
- [ ] Interação pin ↔ card
- [ ] Filtro "Aberto agora" (**fuso do bar**)
- [ ] Filtro "Karaokê hoje"
- [ ] Filtro por distância (5/10/20 km)
- [ ] i18n completo dos rótulos
- [ ] Responsividade mobile
- [ ] Acessibilidade (foco, contraste, teclado)

## Fase 3 — Operação

- [ ] Fluxo de solicitação LGPD (formulário/página + `removal_requests`)
- [ ] Rotina de revalidação trimestral documentada
- [ ] Curadoria contínua até 100+ bares
- [ ] Documentação pública de fontes e metodologia
- [ ] Backup/export periódico do banco

## Fase 4 — Scraping (futuro)

- [ ] Revisão jurídica de ToS antes de iniciar (gate em `docs/scraping.md`)
- [ ] Pipeline de scraper + staging + curadoria
- [ ] Deduplicação (geohash + similaridade de nome)
- [ ] Revalidação automatizada

---

## Decisões em aberto (bloqueiam partes das Fases 0–2)

- [ ] Geocoding: MapTiler Geocoding vs Nominatim (ver ADR-006)
- [ ] Globo-intro: manter (1 dia) ou splash estático (ver ADR-002)
- [ ] E-mail/contato LGPD definitivo
