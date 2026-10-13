-- 0001_enums.sql
-- Tipos enumerados do domínio.

create type bar_status as enum ('active', 'suspect', 'closed');
create type karaoke_type as enum ('evento', 'permanente');
create type removal_type as enum ('full', 'correction', 'opt_out');
create type removal_subject as enum ('bar', 'person');
create type source_platform as enum (
  'instagram',
  'google_maps',
  'osm',
  'foursquare',
  'manual',
  'other'
);
