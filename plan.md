# 🎤 Karaokê Map — Plano de Projeto

**Versão:** 0.1
**Escopo:** Fortaleza + Região Metropolitana (CE)
**Status:** Planejamento
**Responsável:** Dev solo (curadoria + desenvolvimento)

---

## 📋 Sumário

1. [Visão Geral](#1-visão-geral)
2. [Definições Canônicas](#2-definições-canônicas)
3. [Escopo e Público](#3-escopo-e-público)
4. [Legal, Compliance e LGPD](#4-legal-compliance-e-lgpd)
5. [Coleta de Dados (Scraping)](#5-coleta-de-dados-scraping)
6. [Modelagem de Dados](#6-modelagem-de-dados)
7. [Visualização (Frontend)](#7-visualização-frontend)
8. [Stack Técnica](#8-stack-técnica)
9. [Riscos e Mitigações](#9-riscos-e-mitigações)
10. [Roadmap](#10-roadmap)
11. [Próximos Passos](#11-próximos-passos)

---

## 1. Visão Geral

### 1.1 Objetivo
Aplicação web com **globo 3D central** para descoberta de bares com karaokê, com painel de informações em **cards laterais**, voltada a **turistas** ("onde cantar agora") e **pesquisadores** (dados históricos/estruturados).

### 1.2 Proposta de valor
- Registro **curado** de bares com karaokê (não é agregador genérico).
- Diferencia **horário do bar** vs. **horário do karaokê**.
- Dados estruturados, exportáveis, com fonte rastreável.
- Internacionalização PT / EN / ES.

### 1.3 Fluxo resumido

    Usuário → busca endereço → globo anima até a região
           → pins aparecem → cards laterais listam bares
           → filtra "aberto agora" / "karaokê hoje"

---

## 2. Definições Canônicas

| Termo | Definição |
|---|---|
| **Bar de karaokê** | Estabelecimento cujo karaokê é **oferta principal** (opção *a*). Bares que só ocasionalmente tocam karaokê ficam fora. |
| **Karaokê recorrente** | Evento com dia/hora definidos. Tag: `evento`. |
| **Karaokê permanente** | Parte da operação contínua do bar. Tag: `permanente`. |
| **Ambos** | Permitido — o mesmo bar pode ter os dois, com tags diferenciando. |

> **Regra de negócio:** se horário do bar e horário do karaokê coincidem, o frontend unifica. Se diferem, exibe dois blocos ("Bar aberto" / "Karaokê rola às…").

---

## 3. Escopo e Público

### 3.1 Escopo geográfico

| Fase | Cobertura |
|---|---|
| **Fase 1** | Fortaleza (capital) + Região Metropolitana |
| **Fase 2 (futuro)** | Outras capitais do Nordeste |
| **Fora de escopo** | Brasil inteiro, mundo |

### 3.2 Público-alvo

- **Turista:** busca endereço → vê bares próximos → decide ir agora ou planeja.
- **Pesquisador:** consulta/exporta dados estruturados de horários, localização, redes sociais.

### 3.3 Volume realista (6 meses)

- **Meta:** 50–150 bares curados.
- **Teto técnico:** globo suporta milhares; curadoria humana é o gargalo.
- **Não otimizar para escala antes de ter 100 bares validados.**

---

## 4. Legal, Compliance e LGPD

### 4.1 Premissas aceitas

- [x] Risco jurídico de scraping aceito pelo dev.
- [x] Conta pessoal/profissional usada para autenticação (free tier).
- [x] Curadoria humana como camada final — nada é publicado sem revisão.

### 4.2 Riscos por plataforma

| Plataforma | Risco | Mitigação |
|---|---|---|
| Google Maps | ToS proíbe scraping e armazenamento > 30 dias | Scraper lento; dados tratados como "pista"; enriquecimento via OSM |
| Instagram / Meta | ToS proíbe scraping; Meta já processou scrapers | Volume baixo, conta autenticada, ritmo humano, foco em perfis públicos |
| LGPD | Armazenamento de dados de estabelecimentos e possíveis pessoas | Política de remoção + base legal de interesse legítimo |

### 4.3 Política de Remoção (LGPD) — rascunho

**Solicitação:** qualquer estabelecimento ou pessoa pode solicitar remoção total ou parcial enviando e-mail para `[email do dev]` com:

- Nome do estabelecimento ou @ do perfil
- URL no mapa/plataforma
- Tipo de solicitação:
  - ( ) Remoção total
  - ( ) Correção
  - ( ) Oposição ao tratamento

**Prazo de resposta:** 15 dias corridos (LGPD art. 19).

**Ações:**

| Tipo | Ação | Prazo |
|---|---|---|
| Remoção total | Apaga do banco, remove do globo, sem backup retido | 5 dias úteis |
| Correção | Atualiza registro | 7 dias úteis |
| Oposição | Marca `opt_out = true`, scraper ignora | imediato |

**Registro:** toda solicitação fica em `removal_requests` com timestamp, ação tomada e responsável.

### 4.4 Avisos no rodapé da aplicação

- Fonte dos dados: coleta automatizada + curadoria humana.
- Link para política de remoção.
- Contato do responsável (dev) para LGPD.

---

## 5. Coleta de Dados (Scraping)

### 5.1 Fontes

| Fonte | Uso | Método |
|---|---|---|
| Instagram | Descoberta de bares com karaokê via hashtags e perfis | Scraper com conta pessoal, ritmo lento |
| Google Maps | Localização, horário de funcionamento, existência | Scraper leve ou Places API (free tier) |
| OpenStreetMap | Validação de endereço e geocoding reverso | Nominatim / Overpass (gratuito) |
| Foursquare / Yelp | Enriquecimento (opcional) | API oficial free tier |

### 5.2 Estratégia de descoberta no Instagram

- **Hashtags-alvo:** `#karaoke`, `#karaokefortaleza`, `#karaokebar`, `#karaokecaragua`, variações com "ceará", "fortaleza", "caucaia", "maracanaú", etc.
- **Perfis-alvo:** perfis de bares já curados (para descobrir eventos e horários).
- **Threshold:** só entra no banco se pelo menos **2 sinais** apontarem para karaokê (hashtag + bio, ou hashtag + post recorrente).
- **Curadoria humana obrigatória** antes de publicar.

### 5.3 Deduplicação

- **Chave primária de cruzamento:** geohash (precisão ~7) + similaridade de nome (Levenshtein / Jaro-Winkler) + telefone/endereço.
- **Falsos positivos:** resolvidos manualmente pelo dev.
- **Mesmo bar em fontes diferentes:** consolida em um único registro com `sources[]`.

### 5.4 Revalidação

- **Frequência:** mensal.
- **Critério de "ainda existe":**
  - Google Maps retorna o local como ativo
  - Instagram postou nos últimos 90 dias (se perfil existir)
  - Sem sinal de "fechado permanentemente"
- **Ação:** se 2 de 3 sinais falharem → `status = suspeito` → dev revisa → confirma ou remove.

### 5.5 Fuso horário e idioma

- **Fuso:** armazenar sempre em `UTC` + `America/Fortaleza`. Exibição converte para o fuso do usuário via `Intl.DateTimeFormat` no front.
- **Idiomas:** PT, EN, ES. Campo `name_i18n` como JSONB. Nomes de estabelecimentos **não são traduzidos** — só rótulos de UI e descrições curadas.

### 5.6 Anti-bloqueio de IP (recomendações)

1. **Ritmo humano (prioridade máxima):** 1 request a cada 30–90s por domínio. Randomizar intervalo. Rodar de madrugada (BRT).
2. **Rotação de User-Agent:** `fake-useragent` ou lista fixa rotativa coerente com o navegador.
3. **Sessão persistente:** `playwright` com `storage_state` salvo (cookies da sua conta), renovar manualmente quando expirar. **Nunca** logar a cada execução.
4. **Residencial vs. datacenter:** GitHub Actions usa IPs de datacenter (muito visados). Alternativas:
   - Rodar o scraper **na sua máquina** via cron local (IP residencial)
   - **Proxy residencial** — ~US$5–15/mês para volume baixo
   - **Bright Data / Oxylabs** têm trials; evitar depender deles
5. **Fallback:** se bloquear, para. Espera 24h e retoma com ritmo mais lento.
6. **Não usar headless puro:** Playwright em modo headful (ou stealth) reduz detecção.
7. **Distribuir:** rodar uma fonte por dia (segunda = Instagram, terça = Google, etc.).

### 5.7 Pipeline

    [GitHub Actions cron]
        → [Scraper Python: Scrapy (HTML) + Playwright (JS/login)]
        → [Normalização: limpeza, deduplicação, geocoding via Nominatim]
        → [Staging table no Neon: raw_scrapes]
        → [Curadoria manual: dev aprova/rejeita/edita]
        → [Tabelas finais: bars, bar_events, bar_hours]
        → [Frontend consome via API]

**Trigger:** cron (semanal para scraping leve, mensal para revalidação) + manual (`workflow_dispatch` no GitHub Actions).

**Free tier GitHub Actions:** 2000 min/mês (repos privados), ilimitado (públicos). Scraping leve cabe tranquilo.

---

## 6. Modelagem de Dados

    -- Estabelecimento
    bars (
      id UUID PK,
      name TEXT,
      name_i18n JSONB,          -- {"pt": "...", "en": "...", "es": "..."}
      description TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      country TEXT DEFAULT 'BR',
      geohash TEXT,
      lat NUMERIC,
      lng NUMERIC,
      phone TEXT,
      instagram_handle TEXT,
      website TEXT,
      status TEXT,              -- 'active' | 'suspect' | 'closed'
      opt_out BOOLEAN DEFAULT false,
      karaoke_type TEXT[],      -- ['evento', 'permanente']
      sources JSONB,            -- [{"platform": "instagram", "url": "..."}]
      created_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ,
      last_verified_at TIMESTAMPTZ
    )

    -- Horário do bar (funcionamento geral)
    bar_hours (
      id UUID PK,
      bar_id UUID FK,
      weekday SMALLINT,         -- 0-6
      opens_at TIME,
      closes_at TIME,
      timezone TEXT DEFAULT 'America/Fortaleza'
    )

    -- Evento de karaokê (recorrente)
    bar_events (
      id UUID PK,
      bar_id UUID FK,
      weekday SMALLINT,
      starts_at TIME,
      ends_at TIME,
      recurrence TEXT,          -- 'weekly' | 'biweekly' | 'monthly'
      notes TEXT,
      timezone TEXT DEFAULT 'America/Fortaleza'
    )

    -- Solicitações LGPD
    removal_requests (
      id UUID PK,
      bar_id UUID FK,
      requested_at TIMESTAMPTZ,
      type TEXT,                -- 'full' | 'correction' | 'opt_out'
      resolved_at TIMESTAMPTZ,
      notes TEXT
    )

**Regra de negócio importante:**
- Se `bar_hours` e `bar_events` coincidem → frontend **unifica**.
- Se diferem → exibe **dois blocos**: "Bar aberto" e "Karaokê rola às…".

---

## 7. Visualização (Frontend)

### 7.1 Layout

    +---------------------------------------------------------+
    |  [🔍 Buscar endereço...]     [📍 Usar minha localização] |
    +---------------------------------------------------------+
    |                                                         |
    |                      🌍 GLOBO 3D                        |
    |              (centro da tela, rotacionável)             |
    |                                                         |
    +------------------+--------------------------------------+
    |   Card bar 1     |  (cards laterais empilhados)         |
    |   Card bar 2     |                                      |
    |   Card bar 3     |                                      |
    +------------------+--------------------------------------+

### 7.2 Fluxo do usuário

1. Usuário abre app → globo centraliza em Fortaleza (fallback).
2. Digita endereço **ou** clica "usar minha localização".
3. Geocoding → coordenadas → **animação de aproximação** (zoom + rotação).
4. Bares próximos aparecem como pins no globo.
5. Cards laterais listam os bares, ordenados por distância.
6. Clique no pin → destaca o card; clique no card → centraliza o pin.

### 7.3 Geocoding

- **Recomendação:** **Nominatim** (OpenStreetMap) — gratuito, ToS amigável.
- **Alternativa:** Mapbox Geocoding (free tier 100k req/mês).
- **Fallback:** Photon (OSM, mais rápido).

### 7.4 Globo 3D

- **Recomendação:** **Globe.gl** (Three.js) — gratuito, sem tiles pagos, fácil de plugar dados.
- **Alternativa:** CesiumJS — mais poderoso, mas usa Cesium Ion (free tier limitado).
- **Descartar:** Google Earth Web (sem API gratuita viável).

### 7.5 Filtros (MVP)

- "Aberto agora" (compara hora local do usuário com `bar_hours`)
- "Karaokê hoje" (compara com `bar_events` do dia)
- Distância (5 km, 10 km, 20 km)

### 7.6 Internacionalização

- **i18n:** `i18next` (React) ou `svelte-i18n`.
- **Idiomas:** PT (padrão), EN, ES.
- **Detecção:** `navigator.language` + cookie de preferência.

---

## 8. Stack Técnica

| Camada | Escolha | Justificativa |
|---|---|---|
| **Frontend** | React + Vite + TypeScript | Ecossistema maduro, Globe.gl tem bindings React |
| **Globo** | Globe.gl | Free, sem tiles pagos |
| **Busca endereço** | Nominatim (OSM) | Gratuito, ToS amigável |
| **Backend API** | FastAPI (Python) | Leve, tipado |
| **Banco** | Neon (Postgres) | Free tier definido, PostGIS disponível |
| **Scraper** | Scrapy + Playwright | HTML + JS/login |
| **Orquestração** | GitHub Actions | Cron + manual, free tier suficiente |
| **Hospedagem front** | Vercel / Cloudflare Pages | Free tier generoso |
| **Hospedagem API** | Fly.io / Railway / Render | Validar free tier mês a mês |

### 8.1 Atenção ao free tier

- **Neon:** 0.5 GB storage, 1 projeto. Suficiente para 150 bares.
- **Vercel:** 100 GB bandwidth/mês. OK para globo com poucos assets.
- **GitHub Actions:** 2000 min/mês (privados). Scraping leve cabe.
- **Fly.io:** free tier encerrado em 2024. **Railway:** US$5/mês de crédito. **Render:** dorme após 15 min.
- **Plano B:** custo estimado **US$15–30/mês** para esse escopo.

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Bloqueio de IP no Instagram | Alta | Médio | Ritmo lento, conta autenticada, fallback OSM/Google |
| Scraper quebrar (DOM muda) | Alta | Médio | Testes automatizados, alertas no GitHub Actions |
| Dados desatualizados | Média | Alto | Revalidação mensal + curadoria humana |
| ToS do Google/Instagram | Alta | Alto (jurídico) | Aceito pelo dev; volume baixo e dados públicos |
| Free tier acabar | Média | Médio | Plano B de US$15–30/mês |
| LGPD (solicitação de remoção) | Baixa | Alto | Política formal + tabela `removal_requests` |

---

## 10. Roadmap

### Fase 0 — Fundação (semana 1–2)
- [ ] Definir schema final no Neon
- [ ] Subir esqueleto FastAPI + Neon
- [ ] Esqueleto do front com Globe.gl centralizado em Fortaleza
- [ ] Página estática com política de remoção

### Fase 1 — MVP de dados (semana 3–6)
- [ ] Scraper Instagram (hashtags) — ritmo lento
- [ ] Scraper Google Maps (ou Places API)
- [ ] Pipeline de deduplicação + staging
- [ ] Cadastro manual de 10 bares como ground truth
- [ ] Primeira curadoria manual

### Fase 2 — Frontend completo (semana 7–10)
- [ ] Busca de endereço com Nominatim
- [ ] Animação de aproximação do globo
- [ ] Cards laterais com filtros
- [ ] i18n PT/EN/ES
- [ ] Geolocalização do usuário

### Fase 3 — Operação (semana 11+)
- [ ] Cron de revalidação mensal
- [ ] Sistema de solicitação LGPD
- [ ] Curadoria contínua até 100+ bares
- [ ] Documentação pública de fontes e metodologia

---

## 11. Próximos Passos

1. **Confirmar biblioteca do globo:** Globe.gl é a aposta; validar em protótipo de 1 dia.
2. **Escolher onde roda o scraper:** GitHub Actions (fácil) vs. máquina local (IP residencial).
3. **Fechar schema do banco** com base nas tabelas acima.
4. **Definir e-mail/contato LGPD** e publicar política antes do primeiro dado público.
5. **Cadastrar manualmente 5–10 bares** em Fortaleza como ground truth.

---

*Documento vivo — versão 0.1, sujeito a revisão após protótipo do globo e primeiro ciclo de scraping.*