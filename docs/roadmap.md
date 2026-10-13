# Roadmap

> Cada fase tem **entregáveis** e **critérios de aceite** verificáveis.
> Datas são relativas ao início da Fase 0.

## Fase 0 — Fundação (semanas 1–2)

**Entregáveis**
- Projeto Vite + React + TS com lint/prettier/test configurados.
- Projeto Supabase + migrations (schema + RLS) + seed dev.
- Skeleton com MapLibre centralizado em Fortaleza.
- Página estática de Política de Remoção (PT/EN).
- CI (lint → typecheck → test → build).
- Protótipo de globo-intro **ou** decisão de corte (ADR-002).

**Critérios de aceite**
- [ ] `npm run dev` sobe o mapa centrado em Fortaleza.
- [ ] Migrations aplicam sem erro; seed popula 3 bares.
- [ ] RLS: consulta anônima retorna só bares `active`/`opt_out=false` (teste SQL).
- [ ] CI verde no primeiro PR.
- [ ] Política de remoção acessível em `/privacidade`.

## Fase 1 — Admin + ground truth (semanas 3–5)

**Entregáveis**
- Login admin (Supabase Auth) + rota `/admin` protegida.
- CRUD de `bars`, `bar_hours`, `bar_events`.
- Upload de fotos (Storage) + `bar_media`.
- Gestão de `bar_sources` e `opt_out`.
- Cadastro manual de **10–15 bares reais**.
- i18n PT/EN aplicado aos rótulos.

**Critérios de aceite**
- [ ] Admin cria/edita/desativa bar com horário que cruza meia-noite.
- [ ] Fotos aparecem no detalhe do bar.
- [ ] Anônimo não consegue escrever (teste RLS).
- [ ] 10–15 bares reais cadastrados e revisados.
- [ ] E2E do fluxo de cadastro passando.

## Fase 2 — Front público (semanas 6–8)

**Entregáveis**
- Busca de endereço + "usar minha localização".
- Pins + clustering + cards laterais ordenados por distância.
- Interação pin ↔ card; detalhe do bar.
- Filtros: **Aberto agora** (fuso do bar), **Karaokê hoje**, raio (5/10/20 km).
- Responsividade mobile (bottom sheet) e acessibilidade básica.

**Critérios de aceite**
- [ ] "Aberto agora" correto com bar em `America/Fortaleza` e usuário em outro fuso.
- [ ] Filtro "Karaokê hoje" usa a data no fuso do bar.
- [ ] Cards ordenados por distância ao usar a localização.
- [ ] Layout utilizável em 360px de largura.
- [ ] E2E: buscar → selecionar pin → ver card.

## Fase 3 — Operação (semana 9+)

**Entregáveis**
- Processo/formulário de solicitação LGPD.
- Rotina de revalidação trimestral documentada.
- Curadoria contínua até **100+ bares**.
- Documentação pública de fontes e metodologia.
- Backup/export periódico.

**Critérios de aceite**
- [ ] Solicitação `opt_out` remove o bar do público imediatamente.
- [ ] Registro de revalidação atualiza `last_verified_at`.
- [ ] 100+ bares ativos e verificados.
- [ ] Página pública de metodologia no ar.

## Fase 4 — Scraping (futuro)

**Gate:** revisão jurídica de ToS **antes** de iniciar (ver [`scraping.md`](scraping.md)).

**Entregáveis**
- Pipeline de coleta + staging + curadoria.
- Deduplicação (geohash + similaridade de nome).
- Revalidação automatizada.

**Critérios de aceite**
- [ ] Coleta dentro do ritmo/limites definidos.
- [ ] Dedup consolida mesmo bar de múltiplas fontes.
- [ ] Nada publicado sem curadoria humana.

## Fora de escopo (por ora)

- Brasil inteiro / mundo.
- App nativo (iOS/Android).
- Monetização/contas de usuário finais.
