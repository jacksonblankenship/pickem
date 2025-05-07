import { PickCategory, PickStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import {
  Circle,
  CircleCheckBig,
  CircleMinus,
  CircleSlash,
  CircleX,
  Clock,
} from 'lucide-react';

const pickOverviewVariants = cva('flex items-center justify-between', {
  variants: {
    status: {
      'not-picked':
        '[&>dd]:text-muted-foreground [&_svg]:text-muted-foreground',
      locked: '[&>dd]:text-yellow-500 [&_svg]:text-yellow-500',
      win: '[&>dd]:text-green-500 [&_svg]:text-green-500',
      loss: '[&>dd]:text-red-500 [&_svg]:text-red-500',
      push: '[&>dd]:text-muted-foreground [&_svg]:text-muted-foreground',
      'missed-pick': '[&>dd]:text-red-500 [&_svg]:text-red-500',
    } satisfies Record<PickStatus, string>,
  },
  defaultVariants: {
    status: 'not-picked',
  },
});

interface PickOverviewItemProps
  extends VariantProps<typeof pickOverviewVariants>,
    React.HTMLAttributes<HTMLDListElement> {
  type: PickCategory;
}

export function PickOverviewItem({
  type,
  status,
  className,
  ...nativeProps
}: PickOverviewItemProps) {
  const Icon =
    status === 'locked'
      ? Clock
      : status === 'win'
        ? CircleCheckBig
        : status === 'loss'
          ? CircleX
          : status === 'push'
            ? CircleSlash
            : status === 'missed-pick'
              ? CircleMinus
              : Circle;

  const label =
    status === 'locked'
      ? 'Locked'
      : status === 'win'
        ? 'Win'
        : status === 'loss'
          ? 'Loss'
          : status === 'push'
            ? 'Push'
            : status === 'missed-pick'
              ? 'Missed Pick'
              : 'Not Picked';

  return (
    <dl
      className={cn(pickOverviewVariants({ status }), className)}
      {...nativeProps}>
      <dt className="flex items-center gap-2 font-bold capitalize">
        {Icon !== null && <Icon className="size-5" aria-label={label} />}
        {`${type}:`}
      </dt>
      <dd className="text-xs uppercase">{label}</dd>
    </dl>
  );
}
