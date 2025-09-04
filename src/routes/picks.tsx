import { BetOptionConfirmation } from '@/components/bet-option-confirmation';
import { WeekSlate } from '@/components/week-slate';
import { usePicksParamsStore } from '@/stores/picks-params-store';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const Route = createFileRoute('/picks')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      groupId: z.number(),
      year: z.number(),
      week: z.number(),
    }),
  ),
  beforeLoad: ({ search }) => {
    usePicksParamsStore.getState().setParams({
      groupId: search.groupId,
      year: search.year,
      week: search.week,
    });
  },
});

function RouteComponent() {
  return (
    <>
      <WeekSlate />
      <BetOptionConfirmation />
    </>
  );
}
