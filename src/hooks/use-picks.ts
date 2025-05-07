import { useBackend } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

const picksFetcher =
  ({ supabase }: ReturnType<typeof useBackend>) =>
  async ({ queryKey }: { queryKey: ['picks', string, number, number] }) => {
    const [, , year, weekNumber] = queryKey;

    const { data, error } = await supabase
      .from('picks')
      .select(
        `*,
        bet_options(
          *, 
          games(
            *,
            away_team:teams!games_away_team_id_teams_id_fk(*),
            home_team:teams!games_home_team_id_teams_id_fk(*)
          )
        )`,
      )
      .eq('bet_options.games.year', year)
      .eq('bet_options.games.week', weekNumber);

    if (error) throw error;

    return data;
  };

export function usePicks(props: {
  groupId: string;
  year: number;
  weekNumber: number;
}) {
  const backend = useBackend();

  const query = useQuery({
    queryKey: ['picks', props.groupId, props.year, props.weekNumber] as const,
    queryFn: picksFetcher(backend),
  });

  return query;
}
