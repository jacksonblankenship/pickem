import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.session === null)
      throw redirect({
        to: '/auth/sign-in',
        search: {
          redirect: location.href,
        },
      });
  },
  loader: () =>
    redirect({ to: '/picks', search: { groupId: 1, year: 2025, week: 1 } }),
});

function RouteComponent() {
  return <div></div>;
}
