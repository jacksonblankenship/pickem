import { BetStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BetStatusIcon } from './bet-status-icon';
import { Button } from './ui/button';

const oddsFormatter = new Intl.NumberFormat('en-US', {
  signDisplay: 'always',
});

export interface BetOptionProps {
  className?: string;
  label: string;
  accessory?: React.ReactNode;
  lockOverlayText: string;
  value: string;
  odds: number;
  betStatus: BetStatus;
  showLockOverlay?: boolean;
  onOptionSelect?: () => void | Promise<void>;
  onConfirmLock?: () => void | Promise<void>;
  onCancelLock?: () => void | Promise<void>;
}

export function BetOption({
  className,
  label,
  value,
  odds,
  accessory = null,
  betStatus = 'not-played',
  lockOverlayText,
  showLockOverlay = false,
  onOptionSelect,
  onConfirmLock,
  onCancelLock,
}: BetOptionProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Lock overlay */}
      <div
        className={cn(
          'absolute z-10 flex h-full w-full items-center gap-2 bg-white p-2',
          'transform transition-transform duration-500 ease-in-out',
          showLockOverlay ? 'translate-x-0' : '-translate-x-full',
        )}>
        {/* Close */}
        <Button variant="outline" onClick={onCancelLock} size="icon">
          <XMarkIcon />
        </Button>

        {/* Confirm */}
        <Button className="flex-1" onClick={onConfirmLock}>
          <LockClosedIcon /> {lockOverlayText}
        </Button>
      </div>

      {/* Option */}
      <div
        className={cn('flex items-center rounded p-2')}
        onClick={onOptionSelect}>
        {/* Label */}
        <div className="mr-auto flex items-center gap-2">
          {accessory}
          <span className="text-sm font-bold sm:text-base">{label}</span>
        </div>

        {/* Odds */}
        <div className="flex flex-col">
          <span className="text-right text-sm sm:text-base">{value}</span>
          <span className="text-right text-xs text-green-500 sm:text-sm">
            {oddsFormatter.format(odds)}
          </span>
        </div>

        {/* Status */}
        <BetStatusIcon betStatus={betStatus} className="ml-2" />
      </div>
    </div>
  );
}
