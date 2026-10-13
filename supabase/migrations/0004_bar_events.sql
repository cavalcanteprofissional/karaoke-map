-- 0004_bar_events.sql
-- Eventos recorrentes de karaokê.

create table bar_events (
  id uuid primary key default gen_random_uuid(),
  bar_id uuid not null references bars (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  anchor_date date,
  interval_weeks smallint not null default 1 check (interval_weeks >= 1),
  starts_at time not null,
  ends_at time,
  recurrence text not null default 'weekly' check (
    recurrence in ('weekly', 'biweekly', 'monthly')
  ),
  notes text,
  timezone text not null default 'America/Fortaleza'
);

create index bar_events_bar_weekday_idx on bar_events (bar_id, weekday);
