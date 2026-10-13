# Registro de Decisões (ADR)

Formato leve de [Architecture Decision Records](https://adr.github.io/).
Status: **Aceito** · **Proposto** · **Substituído**.

---

## ADR-001 — Mapa 2D (MapLibre) como core; globo 3D como intro · **Aceito**

**Contexto:** o plano v0.1 propunha globo 3D central para descoberta de POIs.
**Decisão:** usar **MapLibre GL JS** como mapa principal e Globe.gl apenas na abertura.
**Motivo:** mapa 2D é muito superior a street-level, mais leve no mobile e mais rápido de construir.
**Consequências:** menos "wow", UX melhor; Globe.gl fica opcional (ver ADR-002).

## ADR-002 — Globo-intro: manter ou cortar · **Proposto**

**Decisão pendente:** manter protótipo de 1 dia do globo-intro **ou** splash estático.
**Critério:** custo × valor percebido; validar performance em mobile.

## ADR-003 — Supabase all-in-one no lugar de FastAPI + Neon · **Aceito**

**Decisão:** Postgres + Auth + REST + Storage no Supabase; sem backend próprio no MVP.
**Motivo:** free tier, menos infra para dev solo, autenticação e fotos resolvidas.
**Consequências:** lógica privilegiada futura vai para Edge Functions; dependência do fornecedor.

## ADR-004 — Auth com conta admin única · **Aceito**

**Decisão:** apenas o dev loga (Supabase Auth, 1 conta) + RLS restringindo escrita.
**Motivo:** multiusuário é desnecessário agora e adiciona complexidade.
**Consequências:** reavaliar se surgirem curadores externos.

## ADR-005 — Curadoria manual no MVP; scraping adiado · **Aceito**

**Decisão:** primeiros 10–100 bares por curadoria manual; scraping só na Fase 4.
**Motivo:** curadoria é o gargalo e o risco jurídico do scraping não compensa no início.
**Consequências:** menor cobertura inicial; scrapers ganham *gate* jurídico.

## ADR-006 — Geocoding: MapTiler com fallback Nominatim · **Proposto**

**Decisão pendente:** usar MapTiler Geocoding (mesma conta dos tiles) com fallback Nominatim.
**Motivo:** consolidar fornecedores; Nominatim público tem política de uso.
**Consequências:** cota MapTiler compartilhada entre tiles e geocoding.

## ADR-007 — i18n PT/EN no MVP · **Aceito**

**Decisão:** PT e EN no MVP; ES na Fase 3.
**Motivo:** traduzir 3 idiomas desde o início multiplica trabalho sem validação.

## ADR-008 — "Aberto agora" no fuso do bar + horário overnight · **Aceito**

**Decisão:** calcular status no `timezone` do bar; tratar `closes_at <= opens_at` como virada de dia.
**Motivo:** corrige bug do plano v0.1 (comparava com hora do usuário).
**Consequências:** funções de horário devem ser puras, testadas e com TZ explícito.

## ADR-009 — Licença do projeto · **Aceito**

**Decisão:** código sob **MIT** ([`LICENSE`](../LICENSE)); dados curados sob
**todos os direitos reservados** ([`LICENSE-DATA`](../LICENSE-DATA)).
**Motivo:** separar licença de código e de dados; código aberto e reutilizável,
dados sob controle (restrições a redistribuição/treino de modelos).
**Consequências:** dados de terceiros seguem os termos de suas fontes, que prevalecem.

## ADR-010 — `sources` relacional (`bar_sources`) em vez de JSONB · **Aceito**

**Decisão:** tabela `bar_sources` para fontes.
**Motivo:** rastreabilidade e auditoria exigidas pela LGPD; JSONB dificulta consultas.
**Consequências:** levemente mais tabelas/joins; auditoria mais simples.

---

## Modelo para novas decisões

```markdown
## ADR-0XX — <título> · <Status>

**Contexto:** ...
**Decisão:** ...
**Motivo:** ...
**Consequências:** ...
```
