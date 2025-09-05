import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GameCardProvider } from '@/providers/game-card-provider';
import { useGameQuery } from '@/queries/game-query';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { BetOption } from './bet-option';
import { GameHeader } from './game-header';
import { Market } from './market';
import { Teams } from './teams';

type GameCardProps = PropsWithClassName<{
  gameId: number;
}>;

export function GameCard(props: GameCardProps) {
  const gameQuery = useGameQuery(props.gameId);

  if (gameQuery.isLoading || gameQuery.isError || gameQuery.data === undefined)
    return <Skeleton className="h-60 w-full" />;

  return (
    <GameCardProvider data={gameQuery.data}>
      <Card
        className={cn('flex h-60 flex-col justify-center', props.className)}>
        <CardContent className="space-y-2">
          <GameHeader />
          <Teams />
          <Market type="spread">
            <BetOption type="spread" target="away" />
            <BetOption type="spread" target="home" />
          </Market>
          <Market type="total">
            <BetOption type="total" target="over" />
            <BetOption type="total" target="under" />
          </Market>
        </CardContent>
      </Card>
    </GameCardProvider>
  );
}
