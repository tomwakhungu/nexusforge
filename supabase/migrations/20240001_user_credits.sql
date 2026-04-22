create table if not exists public.user_credits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  credits integer not null default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_credits enable row level security;

create policy "Users can view own credits"
  on public.user_credits for select
  using (auth.uid() = user_id);

create policy "Service role can update credits"
  on public.user_credits for all
  using (true);
