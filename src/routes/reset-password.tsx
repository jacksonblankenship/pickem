import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAppUrl } from '@/lib/utils';
import { supabase } from '@/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, createLink, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/reset-password')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      redirect: z.url().optional(),
    }),
  ),
  beforeLoad: async ({ context, search }) => {
    // If the user is not signed in, return
    if (context.session === null) return;

    // If the user is signed in, redirect to the home page
    throw redirect({
      to: search.redirect ?? '/',
    });
  },
  staticData: { hideAppBar: true },
});

const formSchema = z.object({
  email: z.email('Invalid email address'),
});

const SignInButton = createLink(Button);

function RouteComponent() {
  const [isPasswordLinkSent, setIsPasswordLinkSent] = useState(false);

  const { mutate: resetPassword, isPending: isResetPasswordPending } =
    useMutation({
      mutationFn: async (values: z.infer<typeof formSchema>) => {
        const { error } = await supabase.auth.resetPasswordForEmail(
          values.email,
          { redirectTo: `${getAppUrl()}/update-password` },
        );

        if (error) throw error;

        setIsPasswordLinkSent(true);
      },
      onError: error => {
        toast.error('Failed to reset password', {
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    disabled: isResetPasswordPending,
  });

  if (isPasswordLinkSent) {
    return (
      <AuthLayout>
        <Card>
          <CardHeader>
            <CardTitle>Check Your Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We've sent a password reset link to{' '}
              <b>{form.getValues('email')}</b>. Check your inbox and click the
              link to reset your password.
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <SignInButton variant="link" className="w-full" to="/sign-in">
              Sign In
            </SignInButton>
          </CardFooter>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form
        autoComplete="on"
        onSubmit={form.handleSubmit(data => resetPassword(data))}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  required
                  {...form.register('email')}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={
                form.formState.isValid === false ||
                isResetPasswordPending === true
              }>
              {isResetPasswordPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Reset Password'
              )}
            </Button>
            <SignInButton
              variant="link"
              className="w-full"
              to="/sign-in">
              Sign In
            </SignInButton>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
