# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

Tipos de mudança: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.

---

## [Unreleased]

### Added

- (nada ainda)

---

## [0.2.0] - 2026-10-13

### Added

- Documentação de implementação completa em `docs/`:
  - `architecture.md`, `data-model.md`, `design-system.md`, `testing.md`,
    `setup.md`, `lgpd.md`, `roadmap.md`, `operations.md`, `scraping.md`, `decisions.md`.
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `TODO.md`.
- `LICENSE` (MIT — código) e `LICENSE-DATA` (dados reservados).
- `.gitignore` e `.env.example`.
- Registro de decisões de arquitetura (ADRs) 001–010 em `docs/decisions.md`.

### Changed

- Revisão do plano v0.1 → v0.2 após decisões de arquitetura:
  - Globo 3D rebaixado para **intro**; mapa 2D (MapLibre) passa a ser o core.
  - Backend **FastAPI + Neon** substituído por **Supabase all-in-one**.
  - Scraping **adiado** para a Fase 4; MVP com curadoria manual.
  - i18n reduzido para **PT/EN** no MVP.
  - Corrigido filtro "aberto agora" para usar o **fuso do bar**.
  - Normalização de horários que **cruzam a meia-noite**.

---

## [0.1.0] - 2026-10-13

### Added

- Documento de planejamento inicial (`plan.md`): visão, escopo, LGPD, coleta de
  dados, modelagem, frontend, stack, riscos, roadmap e próximos passos.

[Unreleased]: https://github.com/cavalcanteprofissional/karaoke-map/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/cavalcanteprofissional/karaoke-map/releases/tag/v0.2.0
[0.1.0]: https://github.com/cavalcanteprofissional/karaoke-map/releases/tag/v0.1.0
