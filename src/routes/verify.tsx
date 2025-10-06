import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { minimumLoadingDelay } from '@/lib/utils';
import { supabase } from '@/supabase';
import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  createLink,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/verify')({
  component: RouteComponent,
  staticData: {
    hideAppBar: true,
  },
  validateSearch: zodValidator(
    z.object({
      email: z.email(),
    }),
  ),
  beforeLoad: async ({ context }) => {
    // If the user has a session, redirect to home
    if (context.session !== null) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const BackButton = createLink(Button);

function RouteComponent() {
  const [otp, setOtp] = useState('');
  const { email } = Route.useSearch();
  const navigate = useNavigate();

  const { mutate: verify, isPending: isVerifying } = useMutation({
    mutationFn: async () => {
      const [{ error }] = await Promise.all([
        supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'email',
        }),
        minimumLoadingDelay(),
      ]);

      if (error) throw error;
    },
    onError: error => {
      toast.error('Failed to verify', { description: error.message });
    },
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });

  const { mutate: sendCode, isPending: isSendCodePending } = useMutation({
    mutationFn: async () => {
      const [{ error }] = await Promise.all([
        supabase.auth.signInWithOtp({
          email,
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
  });

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col justify-center px-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-semibold tracking-wide">
          Verify your email
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter the code sent to your email
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <BackButton to="/sign-in" variant="link" className="mr-auto">
          <ArrowLeft className="h-4 w-4" />
          Back
        </BackButton>
        <p className="text-muted-foreground text-center text-sm">
          Code sent to{' '}
          <span className="text-foreground font-mono">{email}</span>
        </p>
        <InputOTP
          maxLength={6}
          onChange={setOtp}
          value={otp}
          autoFocus
          containerClassName="mx-auto">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          disabled={otp.length !== 6 || isVerifying}
          onClick={() => verify()}>
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Didn't receive a code? </span>
          <Button
            variant="link"
            onClick={() => sendCode()}
            disabled={isSendCodePending}
            className="p-0">
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
}
