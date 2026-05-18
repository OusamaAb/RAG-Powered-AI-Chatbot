-- Supabase-backed rate limiting for the portfolio chatbot.
-- This makes rate limits consistent across serverless instances such as Vercel.

create table if not exists public.chat_rate_limits (
  client_key text primary key,
  request_count integer not null default 0 check (request_count >= 0),
  window_reset_at timestamptz not null,
  blocked_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.chat_rate_limits is
  'Stores per-client chatbot rate-limit state. Access should remain server-side only.';

create index if not exists chat_rate_limits_cleanup_idx
  on public.chat_rate_limits (window_reset_at, blocked_until);

alter table public.chat_rate_limits enable row level security;

create or replace function public.check_chat_rate_limit(
  p_client_key text,
  p_window_seconds integer default 60,
  p_max_requests integer default 8,
  p_block_seconds integer default 120
)
returns table (
  allowed boolean,
  retry_after_seconds integer,
  request_count integer,
  blocked_until timestamptz,
  window_reset_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_client_key text := left(trim(coalesce(p_client_key, '')), 200);
  v_window_seconds integer := greatest(coalesce(p_window_seconds, 60), 1);
  v_max_requests integer := greatest(coalesce(p_max_requests, 8), 1);
  v_block_seconds integer := greatest(coalesce(p_block_seconds, 120), 1);
  v_row public.chat_rate_limits%rowtype;
begin
  if v_client_key = '' then
    raise exception 'client key is required';
  end if;

  -- Keep old limiter rows from building up indefinitely.
  delete from public.chat_rate_limits as rate_limits
  where rate_limits.window_reset_at < v_now - interval '1 day'
    and (
      rate_limits.blocked_until is null
      or rate_limits.blocked_until < v_now - interval '1 day'
    );

  -- Serialize updates for the same client key to avoid race conditions.
  perform pg_advisory_xact_lock(hashtext(v_client_key)::bigint);

  select *
  into v_row
  from public.chat_rate_limits as rate_limits
  where rate_limits.client_key = v_client_key
  for update;

  if not found then
    insert into public.chat_rate_limits (
      client_key,
      request_count,
      window_reset_at,
      blocked_until,
      updated_at
    )
    values (
      v_client_key,
      1,
      v_now + make_interval(secs => v_window_seconds),
      null,
      v_now
    )
    returning * into v_row;

    return query
    select true, 0, v_row.request_count, v_row.blocked_until, v_row.window_reset_at;
    return;
  end if;

  if v_row.blocked_until is not null and v_row.blocked_until > v_now then
    return query
    select
      false,
      greatest(1, ceil(extract(epoch from (v_row.blocked_until - v_now)))::integer),
      v_row.request_count,
      v_row.blocked_until,
      v_row.window_reset_at;
    return;
  end if;

  if v_row.window_reset_at <= v_now then
    update public.chat_rate_limits as rate_limits
    set
      request_count = 1,
      window_reset_at = v_now + make_interval(secs => v_window_seconds),
      blocked_until = null,
      updated_at = v_now
    where rate_limits.client_key = v_client_key
    returning rate_limits.* into v_row;

    return query
    select true, 0, v_row.request_count, v_row.blocked_until, v_row.window_reset_at;
    return;
  end if;

  if v_row.request_count + 1 > v_max_requests then
    update public.chat_rate_limits as rate_limits
    set
      request_count = v_row.request_count + 1,
      blocked_until = v_now + make_interval(secs => v_block_seconds),
      updated_at = v_now
    where rate_limits.client_key = v_client_key
    returning rate_limits.* into v_row;

    return query
    select false, v_block_seconds, v_row.request_count, v_row.blocked_until, v_row.window_reset_at;
    return;
  end if;

  update public.chat_rate_limits as rate_limits
  set
    request_count = rate_limits.request_count + 1,
    blocked_until = null,
    updated_at = v_now
  where rate_limits.client_key = v_client_key
  returning rate_limits.* into v_row;

  return query
  select true, 0, v_row.request_count, v_row.blocked_until, v_row.window_reset_at;
end;
$$;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.chat_rate_limits to service_role;
grant execute on function public.check_chat_rate_limit(
  text,
  integer,
  integer,
  integer
) to service_role;

revoke all on table public.chat_rate_limits from anon, authenticated;
revoke execute on function public.check_chat_rate_limit(
  text,
  integer,
  integer,
  integer
) from anon, authenticated;
