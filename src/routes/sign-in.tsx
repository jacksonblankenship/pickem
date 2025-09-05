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
import { env } from '@/lib/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@supabase/supabase-js';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
  staticData: {
    hideAppBar: true,
  },
});

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
);

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error('Failed to sign in', {
        description: error.message,
      });
    }
  }

  return (
    <form
      autoComplete="on"
      onSubmit={form.handleSubmit(onSubmit)}
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
          <Button type="submit">Sign In</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
