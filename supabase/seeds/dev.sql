-- 0009_seed_dev.sql
-- Dados fictícios de desenvolvimento (3 bares). Não usar em produção.

insert into bars (
  id, name, description_i18n, address, city, state,
  lat, lng, instagram_handle, karaoke_types, status
) values
  (
    '11111111-1111-1111-1111-111111111111',
    'Bar Exemplo Centro',
    '{"pt":"Bar fictício para desenvolvimento (centro).","en":"Fictional dev bar (downtown)."}'::jsonb,
    'Rua Exemplo, 100', 'Fortaleza', 'CE',
    -3.731900, -38.526700, 'barexemplocentro',
    '{permanente}'::karaoke_type[], 'active'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Karaokê da Praia',
    '{"pt":"Bar fictício para desenvolvimento (beira-mar).","en":"Fictional dev bar (seafront)."}'::jsonb,
    'Av. Beira Mar, 2000', 'Fortaleza', 'CE',
    -3.724000, -38.498000, 'karaokedapraia',
    '{evento}'::karaoke_type[], 'active'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Bar Suspeito',
    '{"pt":"Registro fictício marcado como suspeito.","en":"Fictional record marked as suspect."}'::jsonb,
    'Rua Fechada, 300', 'Fortaleza', 'CE',
    -3.750000, -38.540000, null,
    '{evento,permanente}'::karaoke_type[], 'suspect'
  )
on conflict (id) do nothing;

-- horários (cruza meia-noite na sexta e sábado)
insert into bar_hours (bar_id, weekday, opens_at, closes_at) values
  ('11111111-1111-1111-1111-111111111111', 3, '20:00', '02:00'),
  ('11111111-1111-1111-1111-111111111111', 5, '20:00', '04:00'),
  ('11111111-1111-1111-1111-111111111111', 6, '20:00', '04:00'),
  ('22222222-2222-2222-2222-222222222222', 4, '19:00', '23:30');

-- eventos de karaokê
insert into bar_events (bar_id, weekday, starts_at, ends_at, recurrence, interval_weeks, notes) values
  ('11111111-1111-1111-1111-111111111111', 3, '21:00', '01:00', 'weekly', 1, 'Quarta do karaokê'),
  ('22222222-2222-2222-2222-222222222222', 4, '20:00', '23:00', 'biweekly', 2, 'Quinzenal');

-- fontes
insert into bar_sources (bar_id, platform, url) values
  ('11111111-1111-1111-1111-111111111111', 'manual', null),
  ('22222222-2222-2222-2222-222222222222', 'instagram', 'https://instagram.com/karaokedapraia');
