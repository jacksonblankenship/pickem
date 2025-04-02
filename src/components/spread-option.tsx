import { BetOption, BetOptionProps } from './bet-option';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SpreadOptionProps
  extends Omit<BetOptionProps, 'label' | 'accessory' | 'lockOverlayText'> {
  teamLogoUrl: string;
  teamAbbreviation: string;
}

export function SpreadOption({
  teamLogoUrl,
  teamAbbreviation,
  ...props
}: SpreadOptionProps) {
  return (
    <BetOption
      lockOverlayText={`${teamAbbreviation} ${props.value}`}
      label={teamAbbreviation}
      accessory={
        <Avatar className="size-6">
          <AvatarImage src={teamLogoUrl} />
          <AvatarFallback>{teamAbbreviation}</AvatarFallback>
        </Avatar>
      }
      {...props}
    />
  );
}
