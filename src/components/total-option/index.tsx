import { TeamAbbr } from '@/lib/team-logo-map';
import { pointTotalFormatter } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { BaseOption } from '../base-option';

interface TotalOptionProps extends HTMLAttributes<HTMLDivElement> {
  type: 'over' | 'under';
  odds: number;
  total: number;
  homeTeamAbbr: TeamAbbr;
  awayTeamAbbr: TeamAbbr;
  isNeutralSite: boolean;
}

export function TotalOption({
  type,
  odds,
  total,
  homeTeamAbbr,
  awayTeamAbbr,
  isNeutralSite,
  className,
  ...nativeProps
}: TotalOptionProps) {
  return (
    <BaseOption
      title={`${type === 'over' ? 'Over' : 'Under'} ${pointTotalFormatter.format(total)}`}
      odds={odds}
      subtitle={`${homeTeamAbbr} ${isNeutralSite ? 'vs.' : '@'} ${awayTeamAbbr}`}
      className={className}
      {...nativeProps}
    />
  );
}
