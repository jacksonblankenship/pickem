import { useGameCardContext } from '@/context/game-card-context';
import { useHasGameStarted } from '@/hooks/use-has-game-started';
import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';

type MarketProps = PropsWithClassName<{
  children: React.ReactNode;
  type: 'spread' | 'total';
}>;

export function Market(props: MarketProps) {
  const { date } = useGameCardContext();
  const hasGameStarted = useHasGameStarted(date);

  return (
    <div className={cn('flex flex-col', props.className)}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-medium">
          {props.type === 'spread' ? 'Spread' : 'Total'}
        </h3>
        {hasGameStarted === false && (
          <span className="text-muted-foreground text-xs">Pick one</span>
        )}
      </div>
      <div className="flex gap-2">{props.children}</div>
    </div>
  );
}
