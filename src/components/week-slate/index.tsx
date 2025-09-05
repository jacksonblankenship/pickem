import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { WeekSlateProvider } from '@/providers/week-slate-provider';
import { useWeekSlateQuery } from '@/queries/week-slate-query';
import { useSearch } from '@tanstack/react-router';
import { GameCard } from '../game-card';

type WeekSlateProps = PropsWithClassName;

export function WeekSlate(props: WeekSlateProps) {
  const { week, year } = useSearch({ from: '/picks' });
  const weekSlateQuery = useWeekSlateQuery({ week: week, year: year });

  if (weekSlateQuery.isLoading) return 'Loading...';

  if (weekSlateQuery.isError) return 'Error loading week data';

  if (
    weekSlateQuery.data === undefined ||
    weekSlateQuery.data.gameIds.length === 0
  )
    return 'No games available';

  return (
    <WeekSlateProvider data={weekSlateQuery.data}>
      <div className={cn('flex flex-col gap-4', props.className)}>
        {weekSlateQuery.data.gameIds.map(gameId => (
          <GameCard gameId={gameId} key={gameId} />
        ))}
      </div>
    </WeekSlateProvider>
  );
}
