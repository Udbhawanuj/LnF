-- Items table
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  status text not null check (status in ('lost', 'found')),
  location text,
  image_url text,
  claim_code text unique not null,
  created_at timestamptz not null default now(),
  owner_id uuid references auth.users (id)
);

-- Claims table
create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  claim_code text not null,
  claimant_name text not null,
  claimant_email text not null,
  details text not null,
  created_at timestamptz not null default now()
);
