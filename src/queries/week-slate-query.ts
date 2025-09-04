import { useSessionContext } from '@/context/session-context';
import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export type WeekSlateData = Awaited<ReturnType<typeof fetchWeekSlateData>>;

async function fetchWeekSlateData(props: { year: number; week: number }) {
  const { data } = await supabase
    .from('games')
    .select('id, bet_options(type, line, picks(id))')
    .eq('year', props.year)
    .eq('week', props.week)
    .order('date', { ascending: true })
    .throwOnError();

  const gameIds = data.map(g => g.id);
  const favoritePicked = data.some(g =>
    g.bet_options.some(
      o => o.type === 'spread' && o.line < 0 && o.picks.length > 0,
    ),
  );
  const underdogPicked = data.some(g =>
    g.bet_options.some(
      o => o.type === 'spread' && o.line > 0 && o.picks.length > 0,
    ),
  );
  const totalPicked = data.some(g =>
    g.bet_options.some(o => o.type === 'total' && o.picks.length > 0),
  );

  return { gameIds, favoritePicked, underdogPicked, totalPicked };
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
