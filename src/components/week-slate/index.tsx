import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { WeekSlateProvider } from '@/providers/week-slate-provider';
import { useWeekSlateQuery } from '@/queries/week-slate-query';
import { useSearch } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { GameCard } from '../game-card';

type WeekSlateProps = PropsWithClassName;

export function WeekSlate(props: WeekSlateProps) {
  const { week, year } = useSearch({ from: '/picks' });
  const weekSlateQuery = useWeekSlateQuery({ week: week, year: year });

  if (weekSlateQuery.isLoading)
    return (
      <div className="mt-24 flex w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (weekSlateQuery.isError)
    return (
      <span className="text-muted-foreground mt-24 w-full text-center text-sm">
        Something went wrong loading the games.
        <br />
        Please try refreshing the page.
      </span>
    );

  if (
    weekSlateQuery.data === undefined ||
    weekSlateQuery.data.gameIds.length === 0
  )
    return (
      <span className="text-muted-foreground mt-24 w-full text-center text-sm">
        No games scheduled for Week {week} of {year}.<br />
        Please check back later.
      </span>
    );

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
