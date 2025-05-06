import { getTeamLogo, TeamAbbr } from '@/lib/team-logo-map';
import { spreadFormatter } from '@/lib/utils';
import { BaseOption } from '../base-option';

interface SpreadOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  teamAbbr: TeamAbbr;
  odds: number;
  spread: number;
}

export function SpreadOption({
  teamAbbr,
  odds,
  spread,
  className,
  ...nativeProps
}: SpreadOptionProps) {
  return (
    <BaseOption
      title={teamAbbr}
      odds={odds}
      subtitle={spreadFormatter.format(spread)}
      imageUrl={getTeamLogo(teamAbbr)}
      className={className}
      {...nativeProps}
    />
  );
}
