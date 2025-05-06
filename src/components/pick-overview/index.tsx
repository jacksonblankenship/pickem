import { PickStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { entries } from 'remeda';
import { PickOverviewItem } from '../pick-overview-item';

interface PickOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  picks: {
    favorite: PickStatus;
    underdog: PickStatus;
    total: PickStatus;
  };
}

export function PickOverview({
  picks,
  className,
  ...nativeProps
}: PickOverviewProps) {
  const picksEntries = entries(picks);

  const totalPicks = picksEntries.filter(
    ([, value]) => value !== 'not-picked',
  ).length;

  const isGraded = picksEntries.every(
    ([, value]) => value !== 'not-picked' && value !== 'locked',
  );

  return (
    <div className={cn('flex flex-col gap-2', className)} {...nativeProps}>
      <h2 className="text-lg font-semibold">Your Picks</h2>
      <div>
        {picksEntries.map(([pickType, pickValue]) => (
          <PickOverviewItem key={pickType} type={pickType} status={pickValue} />
        ))}
      </div>
      {isGraded ? null : totalPicks === 0 ? (
        <p className="text-muted-foreground text-xs">Make your first pick!</p>
      ) : totalPicks < 3 ? (
        <p className="text-muted-foreground text-xs">
          {totalPicks} picks in — {3 - totalPicks} left to go.
        </p>
      ) : null}
    </div>
  );
}
