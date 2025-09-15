import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';

type DateSeparatorProps = PropsWithClassName & {
  label: string;
};

export function DateSeparator({ label, className }: DateSeparatorProps) {
  return (
    <div className={cn('flex items-center gap-3 py-4', className)}>
      <div className="h-px flex-1 bg-slate-200" />
      <span className="px-2 text-sm font-medium text-slate-600">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
