import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { minimumLoadingDelay } from '@/lib/utils';
import { supabase } from '@/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // If the user has a session, redirect to home
    if (context.session !== null) {
      throw redirect({
        to: '/',
      });
    }
  },
  staticData: {
    hideAppBar: true,
  },
});

const formSchema = z.object({
  email: z.email('Invalid email address'),
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutate: sendCode, isPending: isSendCodePending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const [{ error }] = await Promise.all([
        supabase.auth.signInWithOtp({
          email: values.email,
        }),
        minimumLoadingDelay(),
      ]);

      if (error) throw error;
    },
    onError: error => {
      toast.error('Failed to send code', {
        description: error.message,
      });
    },
    onSuccess: () => {
      navigate({
        to: '/verify',
        search: { email: form.getValues('email') },
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    disabled: isSendCodePending,
  });

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col justify-center px-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-semibold tracking-wide">Welcome</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email to continue
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(data => sendCode(data))}
        className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...form.register('email')}
          />
        </div>
        <Button
          type="submit"
          disabled={form.formState.isValid === false || isSendCodePending}>
          {isSendCodePending ? (
            'Sending code...'
          ) : (
            <span className="flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
