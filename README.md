# 🎤 Karaokê Map

![status](https://img.shields.io/badge/status-planejamento-yellow)
![version](https://img.shields.io/badge/version-0.2.0-blue)
![license](https://img.shields.io/badge/licen%C3%A7a-MIT%20(c%C3%B3digo)-green)
![data](https://img.shields.io/badge/dados-todos%20os%20direitos%20reservados-lightgrey)

Aplicação web para **descoberta de bares com karaokê** em **Fortaleza + Região Metropolitana (CE)**.
Mapa 2D interativo com cards laterais, dados curados, filtros de "aberto agora" e "karaokê hoje",
e exportação estruturada para pesquisadores.

> Documento de referência: [`plan.md`](./plan.md) (v0.1) — este repositório implementa a **v0.2**,
> revisada após decisões de arquitetura (ver [`docs/decisions.md`](./docs/decisions.md)).

---

## 📌 Sumário

- [Objetivo](#-objetivo)
- [Status](#-status)
- [Stack](#-stack)
- [Arquitetura](#-arquitetura)
- [Quickstart](#-quickstart)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Documentação](#-documentação)
- [Roadmap](#-roadmap)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato e LGPD](#-contato-e-lgpd)

---

## 🎯 Objetivo

- **Turista:** "onde cantar karaokê agora?" — busca endereço, vê bares próximos, decide na hora.
- **Pesquisador:** consulta e exporta dados estruturados (localização, horários, redes sociais).

Diferenciais:

- Registro **curado** (não é agregador genérico).
- Separa **horário do bar** de **horário do karaokê**.
- Fontes rastreáveis + política de remoção (LGPD).
- Internacionalização **PT / EN** (ES pós-MVP).

## 🚦 Status

**Planejamento → Fundação.** Nenhum código de aplicação implementado ainda.
A documentação de implementação está completa em [`docs/`](./docs).

| Fase | Descrição | Estado |
|---|---|---|
| 0 | Fundação (schema, skeleton, política) | ⬜ não iniciado |
| 1 | Admin + ground truth | ⬜ não iniciado |
| 2 | Front público | ⬜ não iniciado |
| 3 | Operação | ⬜ não iniciado |
| 4 | Scraping (futuro) | ⬜ não iniciado |

Ver [`docs/roadmap.md`](./docs/roadmap.md) para critérios de aceite.

## 🧱 Stack

| Camada | Escolha |
|---|---|
| Frontend | React + Vite + TypeScript |
| Mapa | MapLibre GL JS (tiles MapTiler) |
| Intro | Globe.gl (apenas abertura/branding) |
| Backend / DB | Supabase (Postgres + Auth + REST + Storage) |
| Auth | Supabase Auth — 1 conta admin |
| i18n | i18next (PT/EN) |
| Geocoding | MapTiler Geocoding (fallback Nominatim) |
| Hospedagem | Vercel / Cloudflare Pages |
| Qualidade | Vitest, Testing Library, Playwright, ESLint, Prettier |
| CI | GitHub Actions |

> Orçamento-alvo: **US$ 0/mês** (free tier). Ver [`docs/operations.md`](./docs/operations.md).

## 🏗️ Arquitetura

```
[React + Vite + TS]  ──┐
   ├─ MapLibre (mapa)  │  SDK supabase-js (REST + Auth + Storage)
   ├─ i18next          ├──────────────────────────────►  [Supabase]
   └─ /admin (CRUD)    │                                    ├─ Postgres (+RLS)
                        └─ MapTiler (tiles + geocoding)      ├─ Auth
                                                            ├─ REST (PostgREST)
                                                            └─ Storage (fotos)
```

Detalhes, diagramas Mermaid e fluxos em [`docs/architecture.md`](./docs/architecture.md).

## 🚀 Quickstart

> Ainda não há código. Os passos abaixo descrevem o alvo da **Fase 0**.
> Pré-requisitos e contas em [`docs/setup.md`](./docs/setup.md).

```bash
# 1. Clonar
git clone <url-do-repo>
cd karaoke-map

# 2. Variáveis de ambiente
cp .env.example .env    # preencher chaves do Supabase e MapTiler

# 3. Frontend
npm install
npm run dev             # http://localhost:5173
```

## 📁 Estrutura de pastas

Estrutura-alvo (criada na Fase 0):

```
karaoke-map/
├─ README.md
├─ CHANGELOG.md
├─ TODO.md
├─ CONTRIBUTING.md
├─ SECURITY.md
├─ plan.md
├─ .env.example
├─ docs/                  # documentação de implementação
├─ supabase/
│  └─ migrations/         # SQL versionado (schema + RLS + seed)
├─ src/                   # frontend (a criar na Fase 0)
│  ├─ components/
│  ├─ features/
│  │  ├─ map/
│  │  ├─ bars/
│  │  └─ admin/
│  ├─ lib/                # supabase client, geocoding, i18n
│  └─ routes/
└─ tests/                 # e2e (Playwright)
```

## 📚 Documentação

| Documento | Conteúdo |
|---|---|
| [`docs/architecture.md`](./docs/architecture.md) | Visão técnica, diagramas e fluxos |
| [`docs/data-model.md`](./docs/data-model.md) | ERD, tabelas, enums, RLS e regras de negócio |
| [`docs/design-system.md`](./docs/design-system.md) | UI/UX, componentes, cor, tipografia, a11y |
| [`docs/testing.md`](./docs/testing.md) | Estratégia de testes e casos críticos |
| [`docs/setup.md`](./docs/setup.md) | Ambiente de desenvolvimento e contas |
| [`docs/lgpd.md`](./docs/lgpd.md) | Base legal, política de remoção, prazos |
| [`docs/roadmap.md`](./docs/roadmap.md) | Fases e critérios de aceite |
| [`docs/operations.md`](./docs/operations.md) | Deploy, observabilidade, revalidação, custos |
| [`docs/scraping.md`](./docs/scraping.md) | Coleta automatizada (Fase 4, futuro) |
| [`docs/decisions.md`](./docs/decisions.md) | Registro de decisões de arquitetura (ADRs) |

## 🗺️ Roadmap

Resumo (detalhes em [`docs/roadmap.md`](./docs/roadmap.md)):

- **Fase 0 — Fundação:** Supabase + schema + RLS, skeleton MapLibre, política LGPD.
- **Fase 1 — Admin + ground truth:** CRUD de bares/horários/eventos, 10–15 bares reais, i18n PT/EN.
- **Fase 2 — Front público:** geocoding, geolocalização, pins, cards, filtros.
- **Fase 3 — Operação:** revalidação trimestral, fluxo LGPD, curadoria até 100+.
- **Fase 4 — Scraping:** coleta automatizada (somente se necessário).

## 🤝 Contribuição

Dev solo no momento, mas o fluxo está documentado em [`CONTRIBUTING.md`](./CONTRIBUTING.md)
(Conventional Commits, branches, PRs, testes obrigatórios).

## 📄 Licença

- **Código-fonte:** [MIT](./LICENSE).
- **Dados curados:** [todos os direitos reservados](./LICENSE-DATA).

A separação garante código aberto e reutilizável, mantendo controle sobre o
conjunto de dados (ver [`docs/decisions.md`](./docs/decisions.md) — ADR-009).

## 📮 Contato e LGPD

- **Responsável:** dev solo (a definir nome/e-mail).
- **Solicitações LGPD / remoção:** `[email do dev]` — ver [`docs/lgpd.md`](./docs/lgpd.md).
- **Segurança:** ver [`SECURITY.md`](./SECURITY.md).
