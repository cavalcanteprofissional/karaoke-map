-- 0005_bar_sources.sql
-- Fontes rastreáveis de cada bar (auditoria / LGPD).

create table bar_sources (
  id uuid primary key default gen_random_uuid(),
  bar_id uuid not null references bars (id) on delete cascade,
  platform source_platform not null default 'manual',
  url text,
  captured_at timestamptz not null default now()
);

create index bar_sources_bar_id_idx on bar_sources (bar_id);
