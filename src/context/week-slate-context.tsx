import { WeekSlateData } from '@/queries/week-slate-query';
import { createContext, useContext } from 'react';

const WeekSlateContext = createContext<WeekSlateData>(null!);

export function WeekSlateProvider(props: {
  children: React.ReactNode;
  data: WeekSlateData;
}) {
  return (
    <WeekSlateContext.Provider value={props.data}>
      {props.children}
    </WeekSlateContext.Provider>
  );
}

export function useWeekSlateContext() {
  return useContext(WeekSlateContext);
}
