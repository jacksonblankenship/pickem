import { useBackend } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

const optionsFetcher =
  ({ supabase }: ReturnType<typeof useBackend>) =>
  async ({
    queryKey,
  }: {
    queryKey: [string | undefined, 'options', string, number, number];
  }) => {
    const [, , , year, weekNumber] = queryKey;

    const { data, error } = await supabase
      .from('bet_options')
      .select(
        `*,
        games(
          *,
          away_team:teams!games_away_team_id_teams_id_fk(*),
          home_team:teams!games_home_team_id_teams_id_fk(*)
        )`,
      )
      .eq('games.year', year)
      .eq('games.week', weekNumber);

    if (error) throw error;

    return data;
  };

export function useOptions(props: {
  groupId: string;
  year: number;
  weekNumber: number;
}) {
  const backend = useBackend();

  const query = useQuery({
    queryKey: [
      backend.session?.id,
      'options',
      props.groupId,
      props.year,
      props.weekNumber,
    ] as const,
    queryFn: optionsFetcher(backend),
  });

  return query;
}
