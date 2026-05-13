-- Allow server-side ingestion and retrieval through Supabase's service role.
-- RLS remains enabled on portfolio_chunks and no public policies are added.

grant usage on schema public to service_role;
grant usage on schema extensions to service_role;

grant select, insert, update, delete on table public.portfolio_chunks to service_role;
grant execute on function public.match_portfolio_chunks(
  extensions.vector,
  integer,
  double precision
) to service_role;

do $$
begin
  if exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = 'portfolio_chunks_id_seq'
      and c.relkind = 'S'
  ) then
    grant usage, select on sequence public.portfolio_chunks_id_seq to service_role;
  end if;
end $$;

revoke all on table public.portfolio_chunks from anon, authenticated;
revoke execute on function public.match_portfolio_chunks(
  extensions.vector,
  integer,
  double precision
) from anon, authenticated;
