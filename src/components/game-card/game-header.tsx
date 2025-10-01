import { useHasGameStarted } from '@/hooks/use-has-game-started';
import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatInTimeZone } from 'date-fns-tz';
import { useGameCardContext } from '../../context/game-card-context';

type GameHeaderProps = PropsWithClassName;

export function GameHeader(props: GameHeaderProps) {
  const { date } = useGameCardContext();
  const hasGameStarted = useHasGameStarted(date);

  return (
    <div
      className={cn('flex h-6 items-center justify-between', props.className)}>
      <span className="text-muted-foreground flex items-center gap-1 text-xs">
        {date === null
          ? 'TBD'
          : formatInTimeZone(
              date,
              Intl.DateTimeFormat().resolvedOptions().timeZone,
              hasGameStarted ? "MMM d '•' h:mm a" : "EEE '•' h:mm a",
            )}
      </span>
      {date !== null && hasGameStarted && (
        <span className="text-muted-foreground text-xs">Picks Closed</span>
      )}
    </div>
  );
}
