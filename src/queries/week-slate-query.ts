import { useSessionContext } from '@/context/session-context';
import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export type WeekSlateData = Awaited<ReturnType<typeof fetchWeekSlateData>>;

async function fetchWeekSlateData(props: { year: number; week: number }) {
  const { data } = await supabase
    .from('games')
    .select('id, date, bet_options(type, line, picks(id))')
    .eq('year', props.year)
    .eq('week', props.week)
    .order('date', { ascending: true })
    .throwOnError();

  const now = new Date().getTime();

  const gameIds = data
    .sort((a, b) => {
      const dateA = a.date !== null ? new Date(a.date).getTime() : null;
      const dateB = b.date !== null ? new Date(b.date).getTime() : null;

      if (dateA === null && dateB === null) return 0;
      if (dateA === null) return 1;
      if (dateB === null) return -1;

      const isFutureA = dateA >= now;
      const isFutureB = dateB >= now;

      if (isFutureA !== isFutureB) {
        return isFutureA ? -1 : 1;
      }

      return dateA - dateB;
    })
    .map(g => g.id);

  const favoriteGameId = data.find(g =>
    g.bet_options.some(
      o => o.type === 'spread' && o.line < 0 && o.picks.length > 0,
    ),
  )?.id;

  const underdogGameId = data.find(g =>
    g.bet_options.some(
      o => o.type === 'spread' && o.line > 0 && o.picks.length > 0,
    ),
  )?.id;

  const pointTotalGameId = data.find(g =>
    g.bet_options.some(o => o.type === 'total' && o.picks.length > 0),
  )?.id;

  return {
    gameIds,
    favoriteGameId,
    underdogGameId,
    pointTotalGameId,
  };
}

export function useWeekSlateQuery(props: { year: number; week: number }) {
  const { session } = useSessionContext();

  const query = useQuery({
    queryKey: ['week-slate', props.year, props.week] as const,
    queryFn: async ({ queryKey: [, year, week] }) =>
      fetchWeekSlateData({ year, week }),
    enabled: session !== null,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.error) {
      toast.error('Failed to load week slate', {
        description:
          'Unable to load week slate. Please try refreshing the page.',
      });
    }
  }, [query.error]);

  return query;
}
