import { cn, oddsFormatter } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface BaseOptionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  odds: number;
  imageUrl?: string;
}

export function BaseOption({
  title,
  subtitle,
  odds,
  imageUrl,
  className,
  ...nativeProps
}: BaseOptionProps) {
  return (
    <div
      className={cn('flex h-10 items-center gap-2 sm:h-12', className)}
      {...nativeProps}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="flex aspect-square h-full items-center justify-center object-cover"
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold sm:text-base">{title}</span>
          <span className="text-muted-foreground text-xs sm:text-sm">
            {`(${oddsFormatter.format(odds)})`}
          </span>
        </div>
        <span className="text-muted-foreground text-xs sm:text-sm">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
