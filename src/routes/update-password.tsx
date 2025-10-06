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
import { supabase } from '@/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, createLink, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/update-password')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      redirect: z.url().optional(),
    }),
  ),
  beforeLoad: async ({ context, search }) => {
    console.log('Running update-password beforeLoad');

    // Allow access if the user is in password recovery mode
    if (context.authChangeEvent === 'PASSWORD_RECOVERY') {
      console.log('User is in password recovery mode, allowing access');

      return;
    }

    // Allow access if the user has a session
    if (context.session !== null) {
      console.log('User has a session, allowing access');

      return;
    }

    console.log(
      'User does not have a session and is not in password recovery mode, redirecting to sign-in',
    );

    throw redirect({
      to: search.redirect ?? '/sign-in',
    });
  },
  staticData: { hideAppBar: true },
});

const formSchema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Your passwords don't match. Try again.",
    path: ['confirmPassword'],
  });

const SignInButton = createLink(Button);

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: async (values: z.infer<typeof formSchema>) => {
        const { error } = await supabase.auth.updateUser({
          password: values.password,
        });

        if (error) throw error;
      },
      onSuccess: async () => {
        toast.success('Password updated successfully');
        // Redirect to home page after successful password update
        await navigate({ to: '/' });
      },
      onError: error => {
        toast.error('Failed to update password', {
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    disabled: isUpdatePasswordPending,
  });

  return (
    <AuthLayout>
      <form
        autoComplete="on"
        onSubmit={form.handleSubmit(data => updatePassword(data))}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Update your password</CardTitle>
            <CardDescription>
              Enter your new password below to update your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  {...form.register('password')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  {...form.register('confirmPassword')}
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
                isUpdatePasswordPending === true
              }>
              {isUpdatePasswordPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Update Password'
              )}
            </Button>
            <SignInButton variant="link" className="w-full" to="/sign-in">
              Sign In
            </SignInButton>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
