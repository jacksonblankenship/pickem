import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/supabase';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';

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
        <Link
          to="/picks"
          search={{ groupId: 1, year: 2025, week: 1 }}
          className="font-semibold tracking-tight hover:opacity-80">
          pickem
        </Link>
        <Button variant="ghost" size="sm" onClick={() => mutate()}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
