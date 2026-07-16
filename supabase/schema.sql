create extension if not exists "pgcrypto";

create table if not exists public.users (
  id bigint primary key,
  login text not null unique,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  creator_id bigint not null references public.users(id),
  restaurant text not null check (char_length(restaurant) between 2 and 100),
  group_order_url text not null check (group_order_url ~ '^https://'),
  estimated_delivery_fee numeric(5,2) check (
    estimated_delivery_fee is null
    or (estimated_delivery_fee >= 0 and estimated_delivery_fee <= 100)
  ),
  notes text check (notes is null or char_length(notes) <= 250),
  expires_at timestamptz not null,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_members (
  order_id uuid not null references public.orders(id),
  user_id bigint not null references public.users(id),
  joined_at timestamptz not null default now(),
  primary key (order_id, user_id)
);

create index if not exists orders_creator_id_idx on public.orders(creator_id);
create index if not exists orders_expires_at_idx on public.orders(expires_at);
create index if not exists orders_created_at_idx on public.orders(created_at);
create index if not exists order_members_order_id_idx on public.order_members(order_id);
create index if not exists order_members_user_id_idx on public.order_members(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();
