import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Button } from '../ui/button';

interface WeekSelectorProps extends HTMLAttributes<HTMLDivElement> {
  selectedWeek: number;
  latestAvailableWeek: number;
  totalWeeks?: number;
  onWeekChange: (week: number) => void;
}

export function WeekSelector({
  selectedWeek,
  latestAvailableWeek,
  totalWeeks = 18,
  onWeekChange,
  className,
  ...nativeProps
}: WeekSelectorProps) {
  const isPreviousDisabled = selectedWeek === 1;
  const isNextDisabled = selectedWeek === latestAvailableWeek;

  const onClickNext = () => {
    if (isNextDisabled) return;
    onWeekChange(selectedWeek + 1);
  };

  const onClickPrevious = () => {
    if (isPreviousDisabled) return;
    onWeekChange(selectedWeek - 1);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)} {...nativeProps}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Week {selectedWeek}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={isPreviousDisabled}
            aria-label="Previous week"
            onClick={onClickPrevious}>
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={isNextDisabled}
            aria-label="Next week"
            onClick={onClickNext}>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="scroll-en flex gap-1 overflow-x-auto">
        {Array.from({ length: totalWeeks }).map((_, index) => (
          <Button
            key={index}
            variant={index + 1 === selectedWeek ? 'outline' : 'ghost'}
            disabled={index + 1 > latestAvailableWeek}
            aria-label={`Week ${index + 1}`}
            onClick={() => onWeekChange(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
