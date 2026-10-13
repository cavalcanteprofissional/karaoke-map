-- 0007_removal_requests.sql
-- Solicitações LGPD (remoção, correção, oposição).
-- bar_id é nulo quando o titular é uma pessoa (não um bar).

create table removal_requests (
  id uuid primary key default gen_random_uuid(),
  bar_id uuid references bars (id) on delete set null,
  subject_type removal_subject not null default 'bar',
  subject_ref text,
  requested_at timestamptz not null default now(),
  type removal_type not null,
  resolved_at timestamptz,
  notes text
);

create index removal_requests_bar_id_idx on removal_requests (bar_id);
