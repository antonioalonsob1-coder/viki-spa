-- Esquema SQL para Viki SpA en Neon Postgres
-- Alternativa a `prisma migrate` — ejecutar directo en el SQL Editor de Neon.

create extension if not exists pgcrypto;

create type categoria_proyecto as enum ('HOGAR', 'INSTITUCIONAL');
create type categoria_galeria as enum ('HOGAR_CORTINAJE', 'LICENCIATURAS_COLEGIOS');
create type tipo_servicio_cotizacion as enum ('HOGAR', 'COLEGIO_LICENCIATURA');
create type estado_cotizacion as enum ('NUEVA', 'CONTACTADO', 'EN_NEGOCIACION', 'CERRADA', 'DESCARTADA');

create table if not exists proyectos (
  id            uuid primary key default gen_random_uuid(),
  titulo        text not null,
  descripcion   text,
  categoria     categoria_proyecto not null,
  cliente       text,
  destacado     boolean not null default false,
  fecha_entrega date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists galeria_fotos (
  id           uuid primary key default gen_random_uuid(),
  categoria    categoria_galeria not null,
  titulo       text not null,
  url          text not null,
  proyecto_id  uuid references proyectos(id) on delete set null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_galeria_fotos_categoria on galeria_fotos(categoria);

create table if not exists cotizaciones (
  id                  uuid primary key default gen_random_uuid(),
  nombre              text not null,
  contacto            text not null,
  tipo_servicio       tipo_servicio_cotizacion not null,
  espacio_o_producto  text,
  colegio_o_nivel     text,
  fecha_ceremonia     date,
  mensaje             text,
  estado              estado_cotizacion not null default 'NUEVA',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists idx_cotizaciones_estado on cotizaciones(estado);

-- Trigger genérico para mantener updated_at al día
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_proyectos_updated_at
  before update on proyectos
  for each row execute function set_updated_at();

create trigger trg_cotizaciones_updated_at
  before update on cotizaciones
  for each row execute function set_updated_at();
