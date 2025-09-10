import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // If the user is not logged in, return
    if (context.session === null) return;

    // If the user is logged in but their email is not confirmed, redirect to the check email page
    if (context.session.user.email_confirmed_at === undefined) {
      throw redirect({
        to: '/auth/confirm-email',
      });
    }

    // If the user is logged in and their email is confirmed, redirect to the home page
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

function RouteComponent() {
  const { mutate, isPending } = useMutation({
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
    disabled: isPending,
  });

  return (
    <form
      autoComplete="on"
      onSubmit={form.handleSubmit(data => mutate(data))}
      className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 md:w-1/2 md:max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...form.register('email')}
              type="email"
              autoComplete="email"
              id="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...form.register('password')}
              type="password"
              autoComplete="current-password"
              id="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={form.formState.isValid === false || isPending === true}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
