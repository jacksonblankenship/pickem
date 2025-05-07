import { PickCategory, PickStatus } from '@/lib/types';
import { ChartArea, Dog, LucideIcon, Star } from 'lucide-react';
import { PickStatusBadge } from '../pick-status-badge';
import { PickStatusIcon } from '../pick-status-icon';

const categoryDetails: Record<
  PickCategory,
  {
    description: string;
    Icon: LucideIcon;
  }
> = {
  favorite: {
    description: 'Pick a favored team to cover (- spread)',
    Icon: Star,
  },
  underdog: {
    description: 'Pick an underdog to cover (+ spread)',
    Icon: Dog,
  },
  total: {
    description: 'Pick Over or Under a point total',
    Icon: ChartArea,
  },
};

export function CategoryWrapper(props: {
  children: React.ReactNode;
  category: PickCategory;
  pickStatus: PickStatus;
}) {
  const { description, Icon } = categoryDetails[props.category];

  return (
    <article className="flex flex-col gap-2">
      <header className="flex items-center">
        <Icon className="mr-4 size-6" aria-label={props.category} />
        <div className="mr-auto">
          <h3 className="capitalize">{props.category}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <PickStatusIcon status={props.pickStatus} />
          <PickStatusBadge status={props.pickStatus} />
        </div>
      </header>
      {props.children}
    </article>
  );
}
