import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GameCardProvider } from '@/providers/game-card-provider';
import { useGameQuery } from '@/queries/game-query';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { BetOption } from './bet-option';
import { GameHeader } from './game-header';
import { Market } from './market';
import { Teams } from './teams';

type GameCardInnerProps = {
  gameId: number;
};

function GameCardInner(props: GameCardInnerProps) {
  const gameQuery = useGameQuery(props.gameId);

  if (gameQuery.isLoading || gameQuery.isError || gameQuery.data === undefined)
    return <Skeleton className="h-60 w-full" />;

  return (
    <GameCardProvider data={gameQuery.data}>
      <Card className="flex h-full w-full flex-col justify-center">
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

function GameCardSkeleton() {
  return <Skeleton className="h-full w-full" />;
}

export function GameCard(props: PropsWithClassName<GameCardInnerProps>) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  });

  return (
    <div className={cn('h-60 w-full', props.className)} ref={ref}>
      {inView ? <GameCardInner gameId={props.gameId} /> : <GameCardSkeleton />}
    </div>
  );
}
