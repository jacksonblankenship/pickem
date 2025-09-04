import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatInTimeZone } from 'date-fns-tz';
import { useGameCardContext } from '../../context/game-card-context';

type GameHeaderProps = PropsWithClassName;

export function GameHeader(props: GameHeaderProps) {
  const { date } = useGameCardContext();

  return (
    <div className={cn('flex items-center justify-between', props.className)}>
      <p className="text-xs text-slate-600">
        {date === null
          ? 'TBD'
          : formatInTimeZone(
              date,
              Intl.DateTimeFormat().resolvedOptions().timeZone,
              "EEE '•' h:mm a",
            )}
      </p>
    </div>
  );
}
