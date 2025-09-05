import { WeekSlateData } from '@/queries/week-slate-query';
import { createContext, useContext } from 'react';

export const WeekSlateContext = createContext<WeekSlateData>(null!);

export function useWeekSlateContext() {
  return useContext(WeekSlateContext);
}
