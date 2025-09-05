import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () =>
    redirect({ to: '/picks', search: { groupId: 1, year: 2025, week: 1 } }),
});

function RouteComponent() {
  return <div>Hello "/"</div>;
}
