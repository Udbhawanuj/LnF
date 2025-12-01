-- Enable RLS
alter table public.items enable row level security;
alter table public.claims enable row level security;

-- Items: anyone can read
create policy "Anyone can read items"
  on public.items
  for select
  using ( true );

-- Items: only authenticated users can insert
create policy "Authenticated can insert items"
  on public.items
  for insert
  with check ( auth.role() = 'authenticated' );

-- Claims: anyone can insert (public claim form)
create policy "Anyone can insert claims"
  on public.claims
  for insert
  with check ( true );

-- Claims: only authenticated users can select (dashboard)
create policy "Authenticated can read claims"
  on public.claims
  for select
  using ( auth.role() = 'authenticated' );
