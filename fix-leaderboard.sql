-- Quick fix: paste this alone into Supabase SQL Editor and Run.
-- It only needs the tables questions + user_progress to already exist.

alter table public.attempt_answers add column if not exists typed_answer text;

drop view if exists public.leaderboard;
create view public.leaderboard as
select p.user_name,
       coalesce(sum(q.points) filter (where p.status = 'correct'), 0)::int as points,
       count(*) filter (where p.status = 'correct')::int as correct
from public.user_progress p
join public.questions q on q.id = p.question_id
group by p.user_name;

grant usage on schema public to anon, authenticated;
grant select on public.leaderboard to anon, authenticated;

notify pgrst, 'reload schema';
