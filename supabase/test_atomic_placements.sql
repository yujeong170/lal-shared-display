-- Run as database owner in a TEST database after atomic_placements.sql.
-- All fixture changes are rolled back.
begin;
do $$
declare
  result jsonb;
  replay jsonb;
begin
  delete from public.furniture_placements where room_id = 'balcony';
  delete from public.placement_requests where room_id = 'balcony';
  update public.room_rounds set generation = 0 where room_id = 'balcony';
  insert into public.furniture_placements(room_id,furniture_id,cells)
    values ('balcony','test-fixture',array(select generate_series(0,22)));
  result := public.confirm_placements('balcony',0,
    '00000000-0000-4000-8000-000000000001',
    '[{"furniture_id":"balcony-plant-1","cells":[23]}]');
  assert result->>'status' = 'ok' and (result->>'completed')::boolean;
  assert (select generation = 1 from public.room_rounds where room_id = 'balcony');
  assert not exists(select 1 from public.furniture_placements where room_id = 'balcony');
  assert jsonb_array_length(public.house_snapshot()->'completions'->'balcony') = 2,
    'Completion snapshot must retain the final placement as well as existing furniture';
  replay := public.confirm_placements('balcony',0,
    '00000000-0000-4000-8000-000000000001',
    '[{"furniture_id":"balcony-plant-1","cells":[23]}]');
  assert replay = result, 'Retry must return the same receipt';
  result := public.confirm_placements('balcony',0,
    '00000000-0000-4000-8000-000000000002',
    '[{"furniture_id":"balcony-plant-1","cells":[23]}]');
  assert result->>'status' = 'stale_round', 'Losing last-cell request must be rejected';
  result := public.confirm_placements('balcony',1,
    '00000000-0000-4000-8000-000000000003',
    '[{"furniture_id":"balcony-plant-1","cells":[0]}]');
  assert result->>'status' = 'ok';
  result := public.confirm_placements('balcony',1,
    '00000000-0000-4000-8000-000000000004',
    '[{"furniture_id":"balcony-plant-1","cells":[0]}, {"furniture_id":"balcony-plant-1","cells":[1]}]');
  assert result->>'status' = 'conflict';
  assert (select count(*) = 1 from public.furniture_placements where room_id = 'balcony'),
    'A conflicting batch must not insert any items';
  assert not has_table_privilege('anon','public.furniture_placements','INSERT');
  assert not has_table_privilege('anon','public.furniture_placements','DELETE');
end;
$$;
rollback;
