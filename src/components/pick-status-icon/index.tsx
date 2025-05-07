import { PickStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import {
  Circle,
  CircleCheckBig,
  CircleMinus,
  CircleSlash,
  CircleX,
  Lock,
} from 'lucide-react';
import { HTMLAttributes } from 'react';

interface PickStatusIconProps
  extends HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof pickStatusIconVariants> {}

const pickStatusIconVariants = cva('size-4', {
  variants: {
    status: {
      locked: 'text-yellow-500',
      win: 'text-green-500',
      loss: 'text-red-500',
      push: 'text-muted-foreground',
      'missed-pick': 'text-red-500',
      'not-picked': 'text-muted-foreground',
    } satisfies Record<PickStatus, string>,
  },
  defaultVariants: {
    status: 'not-picked',
  },
});

export function PickStatusIcon({
  status,
  className,
  ...nativeProps
}: PickStatusIconProps) {
  function getIcon() {
    switch (status) {
      case 'locked':
        return Lock;
      case 'win':
        return CircleCheckBig;
      case 'loss':
        return CircleX;
      case 'push':
        return CircleSlash;
      case 'missed-pick':
        return CircleMinus;
      default:
        return Circle;
    }
  }

  const Icon = getIcon();

  return (
    <Icon
      className={cn(pickStatusIconVariants({ status, className }))}
      role="img"
      aria-label={`Pick status: ${status}`}
      {...nativeProps}
    />
  );
}
