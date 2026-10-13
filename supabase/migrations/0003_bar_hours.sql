-- 0003_bar_hours.sql
-- Funcionamento geral do bar. Se closes_at <= opens_at, o fechamento
-- ocorre no dia seguinte (cruza a meia-noite).

create table bar_hours (
  id uuid primary key default gen_random_uuid(),
  bar_id uuid not null references bars (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  opens_at time not null,
  closes_at time not null,
  timezone text not null default 'America/Fortaleza'
);

create index bar_hours_bar_id_idx on bar_hours (bar_id);
