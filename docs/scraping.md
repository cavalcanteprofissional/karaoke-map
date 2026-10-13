# Coleta Automatizada (Scraping) — Fase 4 (futuro)

> **Status:** adiado. O MVP usa curadoria manual. Este documento define as regras
> e os *gates* que devem ser cumpridos **antes** de qualquer coleta automatizada.

## 1. Gate de início (obrigatório)

Nenhuma linha de scraper é escrita antes de:

- [ ] Revisão dos **Termos de Uso** das plataformas-alvo.
- [ ] Aceite explícito e registrado do risco jurídico pelo responsável.
- [ ] Política de remoção (`opt_out`) funcionando em produção.
- [ ] Volume/ritmo definidos e aprovados (item 3).

## 2. Fontes e uso

| Fonte | Uso | Método |
|---|---|---|
| Instagram | descoberta de bares com karaokê | conta autenticada, ritmo humano, perfis públicos |
| Google Maps | localização, horário, existência | scraper leve **ou** Places API (free tier) |
| OpenStreetMap | validação de endereço/geocoding | Nominatim / Overpass |
| Foursquare/Yelp | enriquecimento (opcional) | API oficial free tier |

> Google Maps: ToS limita armazenamento (>30 dias). Dados do Google são tratados
> como **pista**, enriquecidos via OSM; **não** persistir payload do Google indefinidamente.

## 3. Anti-bloqueio (regras)

1. **Ritmo humano:** 1 request a cada 30–90s por domínio, com jitter; rodar de madrugada (BRT).
2. **User-Agent** rotativo e coerente.
3. **Sessão persistente** (Playwright `storage_state`); **nunca** logar a cada execução.
4. **IP:** preferir máquina local (residencial); datacenter é visado.
5. **Fallback:** se bloquear, parar 24h e retomar mais lento.
6. **Headful/stealth** para reduzir detecção.
7. **Distribuir:** uma fonte por dia.

## 4. Descoberta no Instagram

- **Hashtags-alvo:** `#karaoke`, `#karaokefortaleza`, `#karaokebar`, `#karaokecaragua`,
  variações com "ceará", "fortaleza", "caucaia", "maracanaú".
- **Threshold:** só entra no banco com **≥ 2 sinais** (hashtag + bio, ou hashtag + post recorrente).
- **Curadoria humana obrigatória** antes de publicar.

## 5. Deduplicação

- **Chave:** geohash (≈ precisão 7) + similaridade de nome (Levenshtein/Jaro-Winkler) + telefone/endereço.
- **Mesmo bar em fontes diferentes:** consolida em 1 registro com N `bar_sources`.
- **Falsos positivos:** resolvidos manualmente.

## 6. Revalidação

- **Frequência:** mensal (quando automatizada).
- **Sinais:** ativo no Google Maps; publicou nos últimos 90 dias; sem "fechado permanentemente".
- **Ação:** 2 de 3 sinais falham → `status='suspect'` → revisão humana.
  - *Nota:* bares postam irregularmente; no MVP a janela é substituída por verificação manual trimestral.

## 7. Pipeline (a construir)

```
[cron] → [Scrapy (HTML) + Playwright (JS/login)]
       → [normalização + geocoding]
       → [staging raw_scrapes]
       → [curadoria manual]
       → [bars / bar_events / bar_hours]
```

## 8. Reuso do modelo existente

- Novos campos/tabelas (ex.: `raw_scrapes`) entram via migration na Fase 4.
- `bar_sources` já é o destino auditável das fontes coletadas.
- `opt_out` deve ser **respeitado** por qualquer coletor.

## 9. Ética e legal

- Priorizar dados públicos e volume baixo.
- Respeitar `robots.txt` quando aplicável.
- Remover imediatamente mediante solicitação LGPD.
- Documentar metodologia publicamente (transparência).
