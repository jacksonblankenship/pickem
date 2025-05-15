import { TWO_HOURS_IN_MS } from '@/lib/constants';
import { getTeamLogo, TeamAbbr } from '@/lib/team-logo-map';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { Clock, MapPin } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface MatchHeaderProps extends HTMLAttributes<HTMLElement> {
  homeTeamAbbr: TeamAbbr;
  awayTeamAbbr: TeamAbbr;
  kickoffTime: Date;
  isNeutralSite: boolean;
}

export function MatchHeader({
  homeTeamAbbr,
  awayTeamAbbr,
  kickoffTime,
  isNeutralSite,
  className,
  ...nativeProps
}: MatchHeaderProps) {
  const hoursUntilStart = kickoffTime.getTime() - new Date().getTime();

  return (
    <header
      className={cn('flex flex-col gap-1', className)}
      aria-label="Match info"
      {...nativeProps}>
      <div className="flex items-center gap-2">
        <div
          role="group"
          aria-label={`Team ${homeTeamAbbr}`}
          className="flex items-center gap-1">
          <img
            className="aspect-square size-5 object-cover"
            src={getTeamLogo(homeTeamAbbr)}
            alt={homeTeamAbbr}
          />
          {homeTeamAbbr}
        </div>

        {isNeutralSite ? 'vs.' : '@'}

        <div
          role="group"
          aria-label={`Team ${awayTeamAbbr}`}
          className="flex items-center gap-1">
          <img
            className="aspect-square size-5 object-cover"
            src={getTeamLogo(awayTeamAbbr)}
            alt={awayTeamAbbr}
          />
          {awayTeamAbbr}
        </div>

        <p>
          {hoursUntilStart > TWO_HOURS_IN_MS ? (
            <span className="text-green-500">
              <span className="sr-only">Match status: </span>
              Available
            </span>
          ) : hoursUntilStart <= 0 ? (
            <span className="text-red-500">
              <span className="sr-only">Match status: </span>
              Live
            </span>
          ) : (
            <span className="text-yellow-500">
              <span className="sr-only">Kickoff in: </span>
              <time dateTime={kickoffTime.toISOString()}>
                {formatDistanceToNowStrict(kickoffTime, { addSuffix: true })}
              </time>
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground flex items-center gap-1">
          <Clock className="size-4" />
          <time dateTime={kickoffTime.toISOString()}>
            {format(kickoffTime, 'eee, MMM d, h:mm a zzz')}
          </time>
        </span>

        {isNeutralSite && (
          <span className="text-muted-foreground flex items-center gap-1">
            <MapPin className="size-4" />
            Neutral Site
          </span>
        )}
      </div>
    </header>
  );
}
