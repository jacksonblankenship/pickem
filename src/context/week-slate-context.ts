import { WeekSlateData } from '@/queries/week-slate-query';
import { createContext, useContext } from 'react';

export const WeekSlateContext = createContext<WeekSlateData>(null!);

export function useWeekSlateContext() {
  const context = useContext(WeekSlateContext);

  if (!context) {
    throw new Error(
      'useWeekSlateContext must be used within a WeekSlateProvider',
    );
  }

  return context;
}
