-- supabase migration: initial schema for NexusForge PBOM + tenancy

create schema if not exists nexusforge;

create table if not exists nexusforge.orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists nexusforge.projects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references nexusforge.orgs(id) on delete cascade,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists nexusforge.pboms (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references nexusforge.projects(id) on delete cascade,
  pipeline_id uuid not null,
  scan_id uuid not null,
  status text not null,
  pbom jsonb,
  credit_cost int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_credits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  credits int not null default 100, -- Free tier
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_pboms_project_id on nexusforge.pboms(project_id);
create index if not exists idx_pboms_scan_id on nexusforge.pboms(scan_id);
