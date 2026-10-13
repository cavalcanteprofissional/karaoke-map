# Security Policy — Karaokê Map

## Escopo

Este documento cobre a segurança da aplicação web (frontend, Supabase, dados) e
o tratamento de dados pessoais (LGPD). Para a política de privacidade e remoção
de dados, ver [`docs/lgpd.md`](docs/lgpd.md).

## Reportar uma vulnerabilidade

Envie um e-mail para **[email do dev]** com:

- Descrição do problema e impacto potencial
- Passos para reproduzir (PoC, se possível)
- Versão/commit afetado
- Sugestão de correção (opcional)

**Não** abra issue pública para falhas de segurança. Resposta em até **5 dias úteis**.

## Boas práticas já adotadas

- Segredos fora do repositório (`.env` ignorado; apenas `.env.example` versionado).
- **Row Level Security (RLS)** habilitado em todas as tabelas expostas.
- Chave `anon` (pública) no front; **nunca** a `service_role` key.
- Escrita no banco restrita a usuário autenticado (admin).
- Dependências auditadas periodicamente (`npm audit`).

## Modelo de ameaças (resumo)

| Ativo | Ameaça | Mitigação |
|---|---|---|
| Chave `service_role` | Vazamento → acesso total ao banco | Nunca no cliente; só em ambiente de admin/CI seguro |
| Tabelas Supabase | Leitura/escrita indevida | RLS + policies por papel |
| Conta admin | Acesso não autorizado | Senha forte + 2FA no provedor (Supabase/GitHub) |
| Dados pessoais (@, nome) | Uso sem base legal | LGPD: interesse legítimo + política de remoção |
| Fotos de bares | Direito autoral | Usar apenas fotos próprias ou com licença; remover sob solicitação |

## Segredos e rotação

- Segredos vivem apenas em variáveis de ambiente (local e Vercel/Supabase).
- Em caso de vazamento: **rotacionar imediatamente** e revisar logs de acesso.
