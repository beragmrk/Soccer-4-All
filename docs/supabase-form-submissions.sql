create extension if not exists pgcrypto;

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists form_submissions_created_at_idx
  on public.form_submissions (created_at desc);

create index if not exists form_submissions_form_type_idx
  on public.form_submissions (form_type);
