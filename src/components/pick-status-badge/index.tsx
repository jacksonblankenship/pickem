import { PickStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

interface PickStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pickStatusBadgeVariants> {}

const pickStatusBadgeVariants = cva('uppercase text-sm', {
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

export function PickStatusBadge({
  status,
  className,
  ...nativeProps
}: PickStatusBadgeProps) {
  function getLabel() {
    switch (status) {
      case 'locked':
        return 'Locked';
      case 'win':
        return 'Win';
      case 'loss':
        return 'Loss';
      case 'push':
        return 'Push';
      case 'missed-pick':
        return 'Missed Pick';
      default:
        return 'Not Picked';
    }
  }

  return (
    <span
      className={cn(pickStatusBadgeVariants({ status, className }))}
      {...nativeProps}>
      {getLabel()}
    </span>
  );
}
