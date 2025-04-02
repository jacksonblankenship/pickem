import { BetOption, BetOptionProps } from './bet-option';

interface TotalOptionProps
  extends Omit<BetOptionProps, 'label' | 'accessory' | 'lockOverlayText'> {
  type: 'over' | 'under';
}

export function TotalOption({ type, ...props }: TotalOptionProps) {
  return (
    <BetOption
      lockOverlayText={`${type === 'over' ? 'O' : 'U'} ${props.value}`}
      label={type === 'over' ? 'Over' : 'Under'}
      {...props}
    />
  );
}
