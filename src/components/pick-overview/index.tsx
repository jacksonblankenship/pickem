import { PickStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { entries } from 'remeda';
import { PickStatusBadge } from '../pick-status-badge';
import { PickStatusIcon } from '../pick-status-icon';

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
      <div className="flex flex-col gap-1">
        {picksEntries.map(([pickType, pickValue]) => (
          <dl className="flex items-center justify-between" key={pickType}>
            <dt className="flex items-center gap-2 font-bold capitalize">
              <PickStatusIcon status={pickValue} /> {pickType}
            </dt>
            <dd>
              <PickStatusBadge status={pickValue} />
            </dd>
          </dl>
        ))}
      </div>
      {isGraded ? null : totalPicks === 0 ? (
        <p className="text-muted-foreground text-sm">Make your first pick!</p>
      ) : totalPicks < 3 ? (
        <p className="text-muted-foreground text-sm">
          {totalPicks} picks in — {3 - totalPicks} left to go.
        </p>
      ) : null}
    </div>
  );
}
