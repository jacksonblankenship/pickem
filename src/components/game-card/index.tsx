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
    return <GameCardSkeleton />;

  return (
    <GameCardProvider data={gameQuery.data}>
      <Card className="flex h-full w-full flex-col justify-center py-0 transition-shadow duration-400 hover:shadow-md">
        <CardContent>
          <GameHeader className="mb-1" />
          <Teams />
          <Market type="spread" className="my-3">
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
  const { ref: dataRef, inView: shouldLoadData } = useInView({
    triggerOnce: true,
    rootMargin: '720px', // roughly 3 game cards
  });

  const { ref: animationRef, inView: shouldAnimate } = useInView({
    triggerOnce: false,
  });

  const ref = (node: HTMLDivElement | null) => {
    dataRef(node);
    animationRef(node);
  };

  return (
    <div
      className={cn(
        'h-60 w-full transition-all duration-300',
        shouldAnimate
          ? 'scale-100 opacity-100 blur-none'
          : 'scale-90 opacity-0 blur-xs',
      )}
      ref={ref}>
      {shouldLoadData ? (
        <GameCardInner gameId={props.gameId} />
      ) : (
        <GameCardSkeleton />
      )}
    </div>
  );
}
