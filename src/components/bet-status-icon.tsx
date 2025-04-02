import { BetStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  CheckIcon,
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export function BetStatusIcon({
  betStatus,
  className,
}: {
  betStatus: BetStatus;
  className?: string;
}) {
  if (betStatus === 'locked')
    return (
      <span
        className={cn('rounded-full border border-blue-500 p-1', className)}>
        <LockClosedIcon className="size-4 text-blue-500" />
      </span>
    );

  if (betStatus === 'won')
    return (
      <span className={cn('rounded-full bg-green-500 p-1', className)}>
        <CheckIcon className="size-4 text-white" />
      </span>
    );

  if (betStatus === 'lost')
    return (
      <span className={cn('rounded-full bg-red-500 p-1', className)}>
        <XMarkIcon className="size-4 text-white" />
      </span>
    );

  return null;
}
