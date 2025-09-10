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
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // If the user is not signed in, return
    if (context.session === null) return;

    // If the user is signed in, redirect to the home page
    throw redirect({
      to: '/',
    });
  },
  staticData: {
    hideAppBar: true,
  },
});

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const SignUpButton = createLink(Button);

function RouteComponent() {
  const { mutate: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      }),
    onError: error => {
      toast.error('Failed to sign in', {
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    disabled: isSignInPending,
  });

  return (
    <AuthLayout>
      <form
        autoComplete="on"
        onSubmit={form.handleSubmit(data => signIn(data))}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email below to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(data => signIn(data))}>
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...form.register('password')}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={
                form.formState.isValid === false || isSignInPending === true
              }>
              {isSignInPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
            <SignUpButton
              variant="outline"
              className="w-full"
              to="/auth/create-account">
              Create Account
            </SignUpButton>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
