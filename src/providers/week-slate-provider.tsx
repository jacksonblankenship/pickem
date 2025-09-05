import { WeekSlateContext } from '@/context/week-slate-context';
import { WeekSlateData } from '@/queries/week-slate-query';

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
