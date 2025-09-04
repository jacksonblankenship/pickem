import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useGameCardContext } from '../../context/game-card-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type TeamsProps = PropsWithClassName;

export function Teams(props: TeamsProps) {
  const { awayTeamAbbr, awayTeamLogo, homeTeamAbbr, homeTeamLogo } =
    useGameCardContext();

  return (
    <div className={cn('grid grid-cols-3 items-center gap-3', props.className)}>
      <div className="flex min-w-0 flex-row items-center gap-2">
        <Avatar className="h-8 w-8 ring-1 ring-slate-200">
          <AvatarImage src={awayTeamLogo} alt={`${awayTeamAbbr} logo`} />
          <AvatarFallback>{awayTeamAbbr}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-wide text-slate-800">
            {awayTeamAbbr}
          </div>
        </div>
      </div>
      <span className="text-center text-xs font-medium text-slate-400 select-none">
        {'@'}
      </span>
      <div className="flex min-w-0 flex-row-reverse items-center gap-2 text-right">
        <Avatar className="h-8 w-8 ring-1 ring-slate-200">
          <AvatarImage src={homeTeamLogo} alt={`${homeTeamAbbr} logo`} />
          <AvatarFallback>{homeTeamAbbr}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-wide text-slate-800">
            {homeTeamAbbr}
          </div>
        </div>
      </div>
    </div>
  );
}
