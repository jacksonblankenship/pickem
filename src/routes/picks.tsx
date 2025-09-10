import { BetOptionConfirmation } from '@/components/bet-option-confirmation';
import { WeekHeader } from '@/components/week-header';
import { WeekSlate } from '@/components/week-slate';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const Route = createFileRoute('/picks')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.session === null) {
      throw redirect({
        to: '/auth/sign-in',
      });
    }

    if (context.session.user.email_confirmed_at === undefined) {
      throw redirect({
        to: '/auth/confirm-email',
      });
    }
  },
  validateSearch: zodValidator(
    z.object({
      groupId: z.number(),
      year: z.number(),
      week: z.number(),
    }),
  ),
});

function RouteComponent() {
  return (
    <>
      <div className="mb-4 flex flex-col gap-4">
        <WeekHeader />
        <WeekSlate />
      </div>
      <BetOptionConfirmation />
    </>
  );
}
