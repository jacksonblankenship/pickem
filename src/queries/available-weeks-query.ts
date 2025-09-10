import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export type AvailableWeeksData = Awaited<
  ReturnType<typeof fetchAvailableWeeks>
>;

async function fetchAvailableWeeks(year: number) {
  const { data } = await supabase
    .from('games')
    .select('week, bet_options!inner(id)')
    .eq('year', year)
    .order('week', { ascending: true })
    .throwOnError();

  // dedupe, since multiple games per week
  const weeks = Array.from(new Set(data.map(g => g.week)));

  return weeks;
}

export function useAvailableWeeksQuery() {
  const { year } = useSearch({ from: '/picks' });

  const query = useQuery({
    queryKey: ['available-weeks', year] as const,
    queryFn: async ({ queryKey: [, year] }) => fetchAvailableWeeks(year),
  });

  useEffect(() => {
    if (query.error) {
      toast.error('Failed to determine max week', {
        description:
          'Unable to determine max week. Please try refreshing the page.',
      });
    }
  }, [query.error]);

  return query;
}
