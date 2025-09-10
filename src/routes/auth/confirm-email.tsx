import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/confirm-email')({
  component: RouteComponent,
  staticData: {
    hideAppBar: true,
  },
  beforeLoad: async ({ context }) => {
    // If the user is not logged in, redirect to the sign in page
    if (context.session === null) {
      throw redirect({
        to: '/auth/sign-in',
      });
    }

    // If the user is logged in and their email is confirmed, redirect to the home page
    if (context.session.user.email_confirmed_at !== undefined) {
      throw redirect({
        to: '/',
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 md:w-1/2 md:max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We sent you an email to verify your account. Please check your email
            and click the link to verify your account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
