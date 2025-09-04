import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/supabase';
import { Link } from '@tanstack/react-router';

type AppBarProps = {
  className?: string;
};

export function AppBar({ className }: AppBarProps) {
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
