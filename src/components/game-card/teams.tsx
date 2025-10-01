import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useGameCardContext } from '../../context/game-card-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type TeamsProps = PropsWithClassName;

export function Teams(props: TeamsProps) {
  const {
    awayTeamAbbr,
    awayTeamLogo,
    homeTeamAbbr,
    homeTeamLogo,
    neutralSite,
    gameStatus,
    awayTeamScore,
    homeTeamScore,
  } = useGameCardContext();

  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_auto_1fr] items-center gap-3',
        props.className,
      )}>
      <div className="flex min-w-0 flex-row items-center gap-2">
        <Avatar className="size-8 rounded-lg bg-white ring-1 ring-slate-200 dark:ring-slate-600">
          <AvatarImage
            src={awayTeamLogo}
            alt={`${awayTeamAbbr} logo`}
            className="rounded-lg p-1"
          />
          <AvatarFallback className="rounded-lg">{awayTeamAbbr}</AvatarFallback>
        </Avatar>
        <div className="min-w-8">
          <div className="text-sm font-semibold tracking-wide">
            {awayTeamAbbr}
          </div>
        </div>
      </div>
      {gameStatus === 'completed' ? (
        <div className="text-muted-foreground grid grid-cols-3 gap-2 text-center text-xs">
          <span
            className={cn(
              awayTeamScore > homeTeamScore && 'text-foreground font-medium',
            )}>
            {awayTeamScore}
          </span>
          <span className="uppercase">final</span>
          <span
            className={cn(
              homeTeamScore > awayTeamScore && 'text-foreground font-medium',
            )}>
            {homeTeamScore}
          </span>
        </div>
      ) : (
        <span className="text-muted-foreground text-center text-xs font-medium select-none">
          {neutralSite ? 'vs.' : '@'}
        </span>
      )}
      <div className="flex min-w-0 flex-row-reverse items-center gap-2 text-right">
        <Avatar className="size-8 rounded-lg bg-white ring-1 ring-slate-200 dark:ring-slate-600">
          <AvatarImage
            src={homeTeamLogo}
            alt={`${homeTeamAbbr} logo`}
            className="rounded-lg p-1"
          />
          <AvatarFallback className="rounded-lg">{homeTeamAbbr}</AvatarFallback>
        </Avatar>
        <div className="min-w-8">
          <div className="text-sm font-semibold tracking-wide">
            {homeTeamAbbr}
          </div>
        </div>
      </div>
    </div>
  );
}
