-- 0006_bar_media.sql
-- Fotos dos bares (arquivos no Supabase Storage).

create table bar_media (
  id uuid primary key default gen_random_uuid(),
  bar_id uuid not null references bars (id) on delete cascade,
  storage_path text not null,
  alt_i18n jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0
);

create index bar_media_bar_id_idx on bar_media (bar_id);
