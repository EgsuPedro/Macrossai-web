-- Tabla de testimonios de Macross AI.
-- Ejecutar una vez en Supabase: Dashboard → SQL Editor → New query → pegar y "Run".

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  company     text not null default '' check (char_length(company) <= 120),
  email       text not null check (char_length(email) <= 254),
  rating      smallint not null check (rating between 1 and 5),
  quote       text not null check (char_length(quote) between 20 and 600),
  consent     boolean not null default true,
  -- Desmarca "published" en el panel para ocultar un testimonio sin borrarlo.
  published   boolean not null default true
);

-- Un testimonio por correo electrónico.
create unique index if not exists testimonials_email_key on public.testimonials (lower(email));
create index if not exists testimonials_published_created_idx on public.testimonials (published, created_at desc);

-- Seguridad: RLS activado y sin políticas públicas.
-- Solo el servidor del sitio (con la clave secreta) puede leer y escribir;
-- así los correos nunca quedan expuestos al navegador.
alter table public.testimonials enable row level security;
