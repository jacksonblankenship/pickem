import { useSessionContext } from '@/context/session-context';
import { getTeamLogo } from '@/lib/team-logo-map';
import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export type GameData = Awaited<ReturnType<typeof fetchGameData>>;

async function fetchGameData(gameId: number) {
  {
    const { data } = await supabase
      .from('games')
      .select(
        `id,
        date,
        away_team:teams!games_away_team_id_teams_id_fk(abbr),
        home_team:teams!games_home_team_id_teams_id_fk(abbr),
        bet_options(id, type, target, line, odds, picks(id))`,
      )
      .eq('id', gameId)
      .single()
      .throwOnError();

    const pick = (
      type: 'spread' | 'total',
      target: 'away' | 'home' | 'over' | 'under',
    ) =>
      data.bet_options.find(o => o.type === type && o.target === target) ??
      null;

    const toSide = (o: ReturnType<typeof pick>) =>
      o
        ? {
            id: o.id,
            line: Number(o.line),
            odds: Number(o.odds),
            picked: (o.picks?.length ?? 0) > 0,
          }
        : null;

    const awaySpread = toSide(pick('spread', 'away'));
    const homeSpread = toSide(pick('spread', 'home'));
    const totalOver = toSide(pick('total', 'over'));
    const totalUnder = toSide(pick('total', 'under'));

    return {
      id: data.id,
      date: data.date !== null ? new Date(data.date) : null,
      awayTeamAbbr: data.away_team.abbr,
      awayTeamLogo: getTeamLogo(data.away_team.abbr),
      homeTeamAbbr: data.home_team.abbr,
      homeTeamLogo: getTeamLogo(data.home_team.abbr),
      options: {
        spread: { away: awaySpread, home: homeSpread },
        total: { over: totalOver, under: totalUnder },
      },
    } as const;
  }
}

export function useGameQuery(gameId: number) {
  const { session } = useSessionContext();

  const query = useQuery({
    queryKey: ['game', gameId] as const,
    queryFn: async ({ queryKey: [, gameId] }) => fetchGameData(gameId),
    enabled: session !== null,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.error) {
      toast.error('Failed to load game', {
        description: 'Unable to load game. Please try refreshing the page.',
      });
    }
  }, [query.error]);

  return query;
}
