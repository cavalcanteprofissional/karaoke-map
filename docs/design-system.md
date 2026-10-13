# Design System & UX

## 1. Princípios

1. **Clareza sobre ornamento** — descobrir um bar rápido vence efeitos visuais.
2. **Mobile-first** — a maioria chega pelo celular na rua.
3. **Confiança no dado** — sempre mostrar a fonte e o "verificado em".
4. **Acessível** — navegável por teclado, contraste AA, textos alternativos.

## 2. Layout

```
+-----------------------------------------------------------+
| [🔍 Buscar endereço...]        [📍 Usar minha localização] |
| [ Aberto agora ] [ Karaokê hoje ] [ 5km ][ 10km ][ 20km ] |
+--------------------------------------+--------------------+
|                                      |  Card bar 1        |
|            🗺️ MAPA (MapLibre)         |  Card bar 2        |
|              pins / clustering        |  Card bar 3        |
|                                      |  ...               |
+--------------------------------------+--------------------+
```

- Desktop: mapa à esquerda (maior), cards à direita (coluna ~380px).
- Mobile: mapa fullscreen + **bottom sheet** arrastável com os cards.
- Barra de filtros fixa no topo do mapa.

## 3. Componentes

| Componente | Função |
|---|---|
| `SearchBar` | Busca de endereço (geocoding) |
| `GeolocateButton` | Usa localização do usuário |
| `FilterBar` | Aberto agora / Karaokê hoje / raio |
| `MapView` | MapLibre + camada de pins |
| `BarPin` | Marcador (destaque no hover/click) |
| `BarCard` | Nome, badges, status, distância, horário |
| `BarDetailSheet` | Detalhe expandido (fotos, contato, fontes) |
| `SourceBadge` | Ícone da fonte + link |
| `LanguageSwitcher` | PT/EN |

### `BarCard` — anatomia

```
┌───────────────────────────────────────────┐
│ Nome do Bar                    [permanente]│
│ ● Aberto agora · fecha 04:00               │
│ 🎤 Karaokê hoje 22:00                      │
│ 📍 1,2 km · @instagram   [fonte: google]   │
└───────────────────────────────────────────┘
```

## 4. Cor e tipografia

- Tema **dark** (uso noturno, ambiente de bares) com acento vibrante.
- Paleta (tokens CSS):

| Token | Uso | Valor sugerido |
|---|---|---|
| `--bg` | fundo | `#0E0E12` |
| `--surface` | card | `#1A1A22` |
| `--text` | texto | `#F5F5F7` |
| `--muted` | secundário | `#9A9AA5` |
| `--accent` | destaque/ação | `#E43F6F` |
| `--ok` | aberto | `#38B26A` |
| `--warn` | suspeito | `#E0A400` |
| `--danger` | fechado | `#D64545` |

- Tipografia: **Inter** (UI), pesos 400/600/700. Escala 12/14/16/20/24/32.
- Espaçamento em múltiplos de `4px`.

## 5. Estados e feedback

| Situação | UI |
|---|---|
| Carregando dados | Skeletons nos cards |
| Nenhum resultado | Estado vazio + sugestão ampliar raio |
| Erro de geocoding | Toast "endereço não encontrado" |
| Bar `suspect` | Badge amarela "verificar" |
| Bar `closed` | Oculto do público |
| Sem localização | Fallback Fortaleza |

## 6. Internacionalização

- i18next; `pt` padrão, `en` secundário. `es` na Fase 3.
- Detecção: `navigator.language` + cookie de preferência.
- **Nomes de bares não traduzem**; `description_i18n` quando houver.
- Datas/horas via `Intl.DateTimeFormat` no fuso do bar.

## 7. Acessibilidade

- Navegação por teclado em busca, filtros e cards.
- `aria-label` em ícones; foco visível (outline `--accent`).
- Contraste mínimo AA.
- Não depender **só** de cor para status (usar texto/ícone).
- Mapa: lista de cards é a alternativa textual acessível aos pins.

## 8. Movimento

- Duração 150–250ms, `ease-out`.
- Respeitar `prefers-reduced-motion` (desligar animação de globo/zoom suave).
