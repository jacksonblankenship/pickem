import { supabase } from '@/supabase';
import { createFileRoute, notFound, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // If the user does not have a session, redirect to sign in
    if (context.session === null) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }

    const { data } = await supabase
      .from('games')
      .select('week, year, bet_options!inner(id)')
      .order('year', { ascending: false })
      .order('week', { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();

    if (data === null) throw notFound();

    const { year, week } = data;

    throw redirect({ to: '/picks', search: { groupId: 1, year, week } });
  },
});

function RouteComponent() {
  return <div></div>;
}
