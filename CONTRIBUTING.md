# Contributing — Karaokê Map

> Projeto atualmente mantido por **um dev solo**. Este documento define o fluxo
> para preservar qualidade e permitir colaboração futura.

## Pré-requisitos

Ver [`docs/setup.md`](docs/setup.md).

## Fluxo de trabalho

1. **Issue primeiro** (mesmo para dev solo) descrevendo objetivo e critério de aceite.
2. **Branch** a partir de `main`:
   - `feat/<slug>` — nova funcionalidade
   - `fix/<slug>` — correção
   - `docs/<slug>` — documentação
   - `chore/<slug>` — manutenção/infra
   - `refactor/<slug>` — refatoração
3. **Commits** no padrão [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat(map): adiciona clustering de pins`
   - `fix(hours): corrige cálculo de horário que cruza a meia-noite`
   - `docs(lgpd): atualiza prazo de resposta`
4. **Pull Request** para `main`, preenchendo o template e vinculando a issue.
5. **Merge** com *squash* após checks verdes.

## Qualidade obrigatória (gate de merge)

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest (unit/integration)
npm run test:e2e    # Playwright
npm run build       # build de produção
```

- Nenhum PR entra com check vermelho.
- Novas regras de negócio **exigem teste** (ver [`docs/testing.md`](docs/testing.md)).

## Convenções de código

- **TypeScript estrito** (`strict: true`). Sem `any` implícito.
- Componentes em **PascalCase**; hooks em `useXxx`.
- Arquivos de feature sob `src/features/<dominio>/`.
- Acesso a dados sempre via `src/lib/supabase` (sem SQL espalhado no front).
- **Proibido** commitar segredos: use `.env` (ignorado) e `.env.example` como referência.
- Textos de UI **nunca** hardcoded — sempre via i18n (`t('...')`).

## Migrations de banco

- Toda alteração de schema é uma migration versionada em `supabase/migrations/`.
- Nunca editar migration já aplicada; criar uma nova.
- Alterações de RLS são migrations como qualquer outra e exigem teste SQL.

## Definition of Done

- [ ] Código implementado e revisado
- [ ] Testes (unit + e2e quando aplicável) passando
- [ ] Lint + typecheck + build verdes
- [ ] `CHANGELOG.md` atualizado em `[Unreleased]`
- [ ] `TODO.md` atualizado
- [ ] Documentação afetada atualizada
