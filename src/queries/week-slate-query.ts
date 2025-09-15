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

  const gameIds = data
    .sort((a: { date: string | null }, b: { date: string | null }) => {
      const now = new Date();
      const dateA = a.date ? new Date(a.date) : null;
      const dateB = b.date ? new Date(b.date) : null;

      const isFutureA = !dateA || dateA >= now;
      const isFutureB = !dateB || dateB >= now;

      // Group: future before past
      if (isFutureA !== isFutureB) {
        return isFutureA ? -1 : 1;
      }

      // Inside the same group:
      if (dateA && dateB) return dateA.getTime() - dateB.getTime();
      if (!dateA && dateB) return 1; // TBD goes after real dates
      if (dateA && !dateB) return -1; // real dates before TBD
      return 0;
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
