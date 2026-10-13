-- 0008_rls.sql
-- Row Level Security: leitura pública apenas de bares ativos e não opt-out;
-- escrita somente para usuários autenticados (admin).

alter table bars enable row level security;
alter table bar_hours enable row level security;
alter table bar_events enable row level security;
alter table bar_sources enable row level security;
alter table bar_media enable row level security;
alter table removal_requests enable row level security;

-- bars ----------------------------------------------------------------------
create policy "bars_public_read" on bars
  for select to anon, authenticated
  using (status = 'active' and opt_out = false);

create policy "bars_admin_write" on bars
  for all to authenticated
  using (true) with check (true);

-- helper: bar visível publicamente
create or replace function is_bar_public(p_bar_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from bars b
    where b.id = p_bar_id and b.status = 'active' and b.opt_out = false
  );
$$;

-- bar_hours -----------------------------------------------------------------
create policy "bar_hours_public_read" on bar_hours
  for select to anon, authenticated
  using (is_bar_public(bar_id));

create policy "bar_hours_admin_write" on bar_hours
  for all to authenticated
  using (true) with check (true);

-- bar_events ----------------------------------------------------------------
create policy "bar_events_public_read" on bar_events
  for select to anon, authenticated
  using (is_bar_public(bar_id));

create policy "bar_events_admin_write" on bar_events
  for all to authenticated
  using (true) with check (true);

-- bar_sources ---------------------------------------------------------------
create policy "bar_sources_public_read" on bar_sources
  for select to anon, authenticated
  using (is_bar_public(bar_id));

create policy "bar_sources_admin_write" on bar_sources
  for all to authenticated
  using (true) with check (true);

-- bar_media -----------------------------------------------------------------
create policy "bar_media_public_read" on bar_media
  for select to anon, authenticated
  using (is_bar_public(bar_id));

create policy "bar_media_admin_write" on bar_media
  for all to authenticated
  using (true) with check (true);

-- removal_requests (apenas admin) ------------------------------------------
create policy "removal_requests_admin" on removal_requests
  for all to authenticated
  using (true) with check (true);
