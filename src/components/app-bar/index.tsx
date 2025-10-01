import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/supabase';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { DoorOpen } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggle } from '../theme-toggle';

type AppBarProps = {
  className?: string;
};

export function AppBar({ className }: AppBarProps) {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
    onError: error => {
      toast.error('Failed to sign out', {
        description: error.message,
      });
    },
  });

  return (
    <header
      role="banner"
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50',
        'dark:bg-gray-950/60 dark:supports-[backdrop-filter]:bg-gray-950/40',
        className,
      )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-tight hover:opacity-80">
          pickem
        </Link>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={() => mutate()}>
            <DoorOpen className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
