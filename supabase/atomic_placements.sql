-- Run once in the Supabase SQL Editor as the database owner before deploying
-- mobile.js. Existing clients must refresh: direct writes are intentionally denied.
begin;

create table if not exists public.room_rounds (
  room_id text primary key,
  capacity integer not null,
  generation bigint not null default 0
);
insert into public.room_rounds (room_id, capacity) values
  ('balcony',24), ('bathroom',25), ('bedroom',32),
  ('kitchen',25), ('living1',40), ('living2',36)
on conflict (room_id) do nothing;

create table if not exists public.placement_requests (
  request_id uuid primary key,
  room_id text not null,
  result jsonb not null
);
alter table public.room_rounds enable row level security;
alter table public.placement_requests enable row level security;
revoke all on public.room_rounds, public.placement_requests from public, anon, authenticated;
revoke insert, update, delete, truncate on public.furniture_placements from public, anon, authenticated;

-- One statement produces placements and generation numbers from one snapshot.
create or replace function public.house_snapshot()
returns jsonb language sql stable security definer
set search_path = public, pg_temp as $$
  select jsonb_build_object(
    'rounds', (select jsonb_object_agg(room_id, generation) from public.room_rounds),
    'placements', coalesce((select jsonb_agg(jsonb_build_object(
      'room_id', room_id, 'furniture_id', furniture_id, 'cells', cells
    )) from public.furniture_placements), '[]'::jsonb)
  );
$$;

create or replace function public.confirm_placements(
  p_room_id text, p_generation bigint, p_request_id uuid, p_items jsonb
)
returns jsonb language plpgsql security definer
set search_path = public, pg_temp as $$
declare
  room public.room_rounds%rowtype;
  cached public.placement_requests%rowtype;
  item jsonb;
  item_cells integer[];
  proposed integer[] := '{}';
  used integer[];
  response jsonb;
  completed boolean;
begin
  -- The persistent room row serializes writers even when the room is empty.
  select * into room from public.room_rounds
    where room_id = p_room_id for update;
  if not found then raise exception 'Unknown room'; end if;
  if p_request_id is null then raise exception 'Missing request ID'; end if;
  select * into cached from public.placement_requests where request_id = p_request_id;
  if found then
    if cached.room_id <> p_room_id then raise exception 'Request room mismatch'; end if;
    return cached.result;
  end if;
  if p_generation is distinct from room.generation then
    return jsonb_build_object('status','stale_round');
  end if;
  if jsonb_typeof(p_items) is distinct from 'array' then raise exception 'Invalid items'; end if;
  if jsonb_array_length(p_items) not between 1 and 4 then raise exception 'Invalid item count'; end if;
  for item in select value from jsonb_array_elements(p_items) loop
    if coalesce(item->>'furniture_id','') = '' or
      jsonb_typeof(item->'cells') is distinct from 'array' then
      raise exception 'Invalid furniture';
    end if;
    select array_agg(value::integer) into item_cells
      from jsonb_array_elements_text(item->'cells');
    if coalesce(cardinality(item_cells),0) = 0 or exists (
      select 1 from unnest(item_cells) c where c is null or c < 0 or c >= room.capacity
    ) then raise exception 'Invalid cells'; end if;
    proposed := proposed || item_cells;
  end loop;
  if cardinality(proposed) > 4 or cardinality(proposed) <>
    (select count(distinct c) from unnest(proposed) c) then
    raise exception 'Invalid or overlapping cells';
  end if;
  select coalesce(array_agg(distinct c), '{}'::integer[]) into used
    from public.furniture_placements f cross join lateral unnest(f.cells) c
    where f.room_id = p_room_id;
  if used && proposed then return jsonb_build_object('status','conflict'); end if;

  for item in select value from jsonb_array_elements(p_items) loop
    insert into public.furniture_placements (room_id, furniture_id, cells)
    values (p_room_id, item->>'furniture_id',
      array(select value::integer from jsonb_array_elements_text(item->'cells')));
  end loop;
  completed := cardinality(used) + cardinality(proposed) >= room.capacity;
  if completed then
    delete from public.furniture_placements where room_id = p_room_id;
    update public.room_rounds set generation = generation + 1 where room_id = p_room_id;
  end if;
  response := jsonb_build_object('status','ok', 'completed',completed,
    'cost',cardinality(proposed), 'generation',room.generation + case when completed then 1 else 0 end,
    'occupied',case when completed then '{}'::integer[] else used || proposed end);
  insert into public.placement_requests values (p_request_id,p_room_id,response);
  return response;
end;
$$;
revoke all on function public.house_snapshot() from public;
revoke all on function public.confirm_placements(text,bigint,uuid,jsonb) from public;
grant execute on function public.house_snapshot() to anon, authenticated;
grant execute on function public.confirm_placements(text,bigint,uuid,jsonb) to anon, authenticated;
commit;
