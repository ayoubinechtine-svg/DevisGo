-- =============================================================
-- DevisGo — Schéma Supabase (PostgreSQL) avec Row Level Security
-- À exécuter dans l'éditeur SQL de votre projet Supabase.
-- =============================================================

create extension if not exists "uuid-ossp";

-- ---------- PROFILES ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);
drop policy if exists "profiles_upsert_own" on profiles;
create policy "profiles_upsert_own" on profiles
  for insert with check (auth.uid() = id);
drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- Création automatique du profil lors de l'inscription Supabase Auth.
-- Cela fonctionne même si la confirmation d'email est activée.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, coalesce(new.email, ''), new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------- BUSINESSES ----------
create table if not exists businesses (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  logo_url text,
  phone text,
  email text,
  address text,
  city text,
  postal_code text,
  ice text,
  if_number text,
  website text,
  description text,
  business_type text not null default 'autre',
  currency text not null default 'MAD',
  language text not null default 'fr',
  plan text not null default 'free',
  created_at timestamptz not null default now()
);

create index if not exists idx_businesses_owner on businesses(owner_id);
create index if not exists idx_businesses_slug on businesses(slug);

alter table businesses enable row level security;

-- Ajoute automatiquement le propriétaire comme membre de son entreprise.
create or replace function public.handle_new_business()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.business_members (business_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict (business_id, user_id) do update set role = 'owner';
  return new;
end;
$$;

drop trigger if exists on_business_created on public.businesses;
create trigger on_business_created
after insert on public.businesses
for each row execute function public.handle_new_business();

-- ---------- BUSINESS_MEMBERS (accès multi-employés, plans Pro/Business) ----------
create table if not exists business_members (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member', -- owner | manager | member
  created_at timestamptz not null default now(),
  unique(business_id, user_id)
);

alter table business_members enable row level security;

-- Fonction utilitaire : l'utilisateur courant a-t-il accès à cette entreprise ?
create or replace function is_business_member(target_business_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from businesses b
    where b.id = target_business_id and b.owner_id = auth.uid()
  ) or exists (
    select 1 from business_members m
    where m.business_id = target_business_id and m.user_id = auth.uid()
  );
$$;

drop policy if exists "businesses_select_members" on businesses;
create policy "businesses_select_members" on businesses
  for select using (is_business_member(id));
drop policy if exists "businesses_insert_owner" on businesses;
create policy "businesses_insert_owner" on businesses
  for insert with check (owner_id = auth.uid());
drop policy if exists "businesses_update_owner" on businesses;
create policy "businesses_update_owner" on businesses
  for update using (owner_id = auth.uid());
drop policy if exists "businesses_delete_owner" on businesses;
create policy "businesses_delete_owner" on businesses
  for delete using (owner_id = auth.uid());

drop policy if exists "members_select" on business_members;
create policy "members_select" on business_members
  for select using (is_business_member(business_id));
drop policy if exists "members_manage_owner" on business_members;
create policy "members_manage_owner" on business_members
  for all using (
    exists (select 1 from businesses b where b.id = business_id and b.owner_id = auth.uid())
  );

-- ---------- CLIENTS ----------
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  first_name text not null,
  last_name text not null default '',
  phone text,
  email text,
  address text,
  city text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_clients_business on clients(business_id);

alter table clients enable row level security;
drop policy if exists "clients_all_members" on clients;
create policy "clients_all_members" on clients
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

-- ---------- SERVICES ----------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  description text,
  price numeric(12,2) not null default 0,
  vat_rate numeric(5,2) not null default 20,
  category text,
  duration_minutes integer,
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_services_business on services(business_id);

alter table services enable row level security;
drop policy if exists "services_all_members" on services;
create policy "services_all_members" on services
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

-- ---------- QUOTES ----------
create table if not exists quotes (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  client_id uuid not null references clients(id) on delete restrict,
  number text not null,
  status text not null default 'draft',
  issue_date date not null default current_date,
  valid_until date,
  subtotal numeric(12,2) not null default 0,
  vat_total numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  notes text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  unique(business_id, number)
);

create index if not exists idx_quotes_business on quotes(business_id);
create index if not exists idx_quotes_client on quotes(client_id);

alter table quotes enable row level security;
drop policy if exists "quotes_all_members" on quotes;
create policy "quotes_all_members" on quotes
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

create table if not exists quote_items (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid not null references quotes(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  name text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  vat_rate numeric(5,2) not null default 20
);

create index if not exists idx_quote_items_quote on quote_items(quote_id);

alter table quote_items enable row level security;
drop policy if exists "quote_items_all_members" on quote_items;
create policy "quote_items_all_members" on quote_items
  for all using (
    exists (select 1 from quotes q where q.id = quote_id and is_business_member(q.business_id))
  )
  with check (
    exists (select 1 from quotes q where q.id = quote_id and is_business_member(q.business_id))
  );

-- ---------- INVOICES ----------
create table if not exists invoices (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  client_id uuid not null references clients(id) on delete restrict,
  quote_id uuid references quotes(id) on delete set null,
  number text not null,
  status text not null default 'draft',
  issue_date date not null default current_date,
  due_date date,
  subtotal numeric(12,2) not null default 0,
  vat_total numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  paid_total numeric(12,2) not null default 0,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  unique(business_id, number)
);

create index if not exists idx_invoices_business on invoices(business_id);
create index if not exists idx_invoices_client on invoices(client_id);

alter table invoices enable row level security;
drop policy if exists "invoices_all_members" on invoices;
create policy "invoices_all_members" on invoices
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

create table if not exists invoice_items (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  name text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  vat_rate numeric(5,2) not null default 20
);

create index if not exists idx_invoice_items_invoice on invoice_items(invoice_id);

alter table invoice_items enable row level security;
drop policy if exists "invoice_items_all_members" on invoice_items;
create policy "invoice_items_all_members" on invoice_items
  for all using (
    exists (select 1 from invoices i where i.id = invoice_id and is_business_member(i.business_id))
  )
  with check (
    exists (select 1 from invoices i where i.id = invoice_id and is_business_member(i.business_id))
  );

-- ---------- PAYMENTS ----------
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount numeric(12,2) not null,
  method text not null default 'cash', -- cash | transfer | card | other
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_payments_invoice on payments(invoice_id);

alter table payments enable row level security;
drop policy if exists "payments_all_members" on payments;
create policy "payments_all_members" on payments
  for all using (
    exists (select 1 from invoices i where i.id = invoice_id and is_business_member(i.business_id))
  )
  with check (
    exists (select 1 from invoices i where i.id = invoice_id and is_business_member(i.business_id))
  );

-- ---------- APPOINTMENTS ----------
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  status text not null default 'pending',
  starts_at timestamptz not null,
  duration_minutes integer not null default 30,
  notes text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_appointments_business on appointments(business_id);
create index if not exists idx_appointments_starts_at on appointments(starts_at);

alter table appointments enable row level security;
drop policy if exists "appointments_all_members" on appointments;
create policy "appointments_all_members" on appointments
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

-- Rendez-vous publics : un visiteur non authentifié peut créer une demande
-- de RDV depuis la page publique (statut "pending" uniquement).
drop policy if exists "appointments_public_insert" on appointments;
create policy "appointments_public_insert" on appointments
  for insert to anon
  with check (status = 'pending');

-- ---------- SUBSCRIPTIONS ----------
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade unique,
  plan text not null default 'free',
  status text not null default 'active', -- active | canceled | past_due
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table subscriptions enable row level security;
drop policy if exists "subscriptions_all_members" on subscriptions;
create policy "subscriptions_all_members" on subscriptions
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

-- ---------- NOTIFICATIONS ----------
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references businesses(id) on delete cascade,
  type text not null, -- new_appointment | quote_accepted | invoice_paid | invoice_late | new_client
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_business on notifications(business_id);

alter table notifications enable row level security;
drop policy if exists "notifications_all_members" on notifications;
create policy "notifications_all_members" on notifications
  for all using (is_business_member(business_id))
  with check (is_business_member(business_id));

-- ---------- PUBLIC READ ACCESS (page publique entreprise) ----------
-- Permet à un visiteur anonyme de consulter le profil et les services
-- d'une entreprise via sa page publique, sans exposer les autres tables.
drop policy if exists "businesses_public_read" on businesses;
create policy "businesses_public_read" on businesses
  for select to anon using (true);
drop policy if exists "services_public_read" on services;
create policy "services_public_read" on services
  for select to anon using (true);

-- ---------- STORAGE ----------
-- Créez un bucket "logos" (public) et un bucket "documents" (privé)
-- depuis Supabase Storage, puis appliquez :
-- insert into storage.buckets (id, name, public) values ('logos', 'logos', true)
--   on conflict (id) do nothing;
-- insert into storage.buckets (id, name, public) values ('documents', 'documents', false)
--   on conflict (id) do nothing;

drop policy if exists "logos_public_read" on storage.objects;
create policy "logos_public_read" on storage.objects
  for select using (bucket_id = 'logos');
drop policy if exists "logos_owner_write" on storage.objects;
create policy "logos_owner_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'logos');
drop policy if exists "logos_owner_update" on storage.objects;
create policy "logos_owner_update" on storage.objects
  for update to authenticated using (bucket_id = 'logos');
