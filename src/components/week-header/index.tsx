import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useAvailableWeeksQuery } from '@/queries/available-weeks-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type WeekHeaderProps = PropsWithClassName;

export function WeekHeader(props: WeekHeaderProps) {
  const { week, groupId, year } = useSearch({ from: '/picks' });
  const availableWeeksQuery = useAvailableWeeksQuery();
  const router = useRouter();

  const handleChangeWeek = (newWeek: string) => {
    router.navigate({
      to: '/picks',
      search: { groupId, year, week: Number(newWeek) },
      replace: true,
    });
  };

  return (
    <div className={cn('', props.className)}>
      <Select
        value={week.toString()}
        onValueChange={handleChangeWeek}
        disabled={availableWeeksQuery.isLoading}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select week" />
        </SelectTrigger>
        <SelectContent>
          {availableWeeksQuery.data?.length ? (
            availableWeeksQuery.data.map(weekNumber => (
              <SelectItem value={weekNumber.toString()} key={weekNumber}>
                Week {weekNumber}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="placeholder" disabled>
              {availableWeeksQuery.isLoading
                ? 'Loading...'
                : 'No weeks available'}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
