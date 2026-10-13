-- 0002_bars.sql
-- Estabelecimentos.

create extension if not exists "pgcrypto";

create table bars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description_i18n jsonb not null default '{}'::jsonb,
  address text,
  city text,
  state text,
  country text not null default 'BR',
  geohash text,
  lat numeric(9, 6) not null,
  lng numeric(9, 6) not null,
  phone text,
  instagram_handle text,
  website text,
  status bar_status not null default 'active',
  opt_out boolean not null default false,
  karaoke_types karaoke_type[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_verified_at timestamptz,
  created_by uuid references auth.users (id),
  updated_by uuid references auth.users (id)
);

create index bars_status_idx on bars (status) where opt_out = false;
create index bars_geohash_idx on bars (geohash);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bars_set_updated_at
before update on bars
for each row
execute function set_updated_at();
