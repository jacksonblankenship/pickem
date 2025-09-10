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
import { env } from '@/lib/env';
import { supabase } from '@/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, createLink, redirect } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/auth/create-account')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // If the user is not signed in, stay on the page
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

const passwordRequirements: {
  regex: RegExp;
  errorMessage: string;
}[] = [
  {
    regex: /^.{8,}$/,
    errorMessage: 'Use 8 or more characters for your password',
  },
  {
    regex: /[a-z]/,
    errorMessage: 'Include a lowercase letter (a-z)',
  },
  {
    regex: /[A-Z]/,
    errorMessage: 'Include an uppercase letter (A-Z)',
  },
  {
    regex: /[0-9]/,
    errorMessage: 'Include a number (0-9)',
  },
  {
    regex: /[!@#$%^&*()_+\-=[\]{};:'"\\|<>?,./`~]/,
    errorMessage: 'Include a symbol (e.g. !@#$%)',
  },
];

const formSchema = z
  .object({
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Use 8 or more characters for your password')
      .max(72, 'Password must be under 72 characters')
      .refine(
        pw =>
          passwordRequirements.every(requirement => requirement.regex.test(pw)),
        {
          message: 'Password must meet all requirements',
          path: ['password'],
        },
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Your passwords don't match. Try again.",
    path: ['confirmPassword'],
  });

const SignInButton = createLink(Button);

function RouteComponent() {
  const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);

  const { mutate: createAccount, isPending: isCreateAccountPending } =
    useMutation({
      mutationFn: (values: z.infer<typeof formSchema>) =>
        supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: env.VITE_APP_ORIGIN,
          },
        }),
      onError: error => {
        toast.error('Failed to create account', { description: error.message });
      },
      onSuccess: () => {
        setIsConfirmingEmail(true);
      },
    });

  const {
    mutate: resendVerificationEmail,
    isPending: isResendingVerificationEmail,
  } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      supabase.auth.resend({
        type: 'signup',
        email: values.email,
        options: {
          emailRedirectTo: env.VITE_APP_ORIGIN,
        },
      }),
    onError: error => {
      toast.error('Failed to resend verification email', {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success('Verification email sent');
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    disabled: isCreateAccountPending,
  });

  if (isConfirmingEmail) {
    return (
      <AuthLayout>
        <Card>
          <CardHeader>
            <CardTitle>Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We've sent a verification link to <b>{form.getValues('email')}</b>
              . Check your inbox and click the link to finish setting up your
              account.
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => resendVerificationEmail(form.getValues())}
              disabled={isResendingVerificationEmail}>
              {isResendingVerificationEmail ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Resend Email'
              )}
            </Button>
            <SignInButton to="/auth/sign-in" className="w-full" variant="link">
              Sign In
            </SignInButton>
          </CardFooter>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form onSubmit={form.handleSubmit(data => createAccount(data))}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email and password to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
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
              {form.formState.errors.email && (
                <p className="text-destructive text-xs">
                  {form.formState.errors.email.message}
                </p>
              )}
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
              <p className="text-muted-foreground text-xs">
                Your password must include the following:
              </p>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                {passwordRequirements.map(rule => (
                  <li
                    key={rule.errorMessage}
                    className={
                      rule.regex.test(form.watch('password'))
                        ? 'text-green-600'
                        : ''
                    }>
                    {rule.errorMessage}
                  </li>
                ))}
              </ul>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  {...form.register('confirmPassword')}
                />
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-destructive text-xs">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={
                form.formState.isValid === false ||
                isCreateAccountPending === true
              }>
              {isCreateAccountPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Create Account'
              )}
            </Button>
            <SignInButton
              variant="outline"
              className="w-full"
              to="/auth/sign-in">
              Sign In
            </SignInButton>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
