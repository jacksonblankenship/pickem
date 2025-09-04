import { useWeekSlateQuery } from '@/queries/week-slate-query';
import { usePicksParamsStore } from '@/stores/picks-params-store';
import { WeekSlateProvider } from '../../context/week-slate-context';
import { GameCard } from '../game-card';

export function WeekSlate() {
  const { week, year } = usePicksParamsStore();
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
      <div className="flex flex-col gap-4">
        {weekSlateQuery.data.gameIds.map(gameId => (
          <GameCard gameId={gameId} key={gameId} />
        ))}
      </div>
    </WeekSlateProvider>
  );
}
