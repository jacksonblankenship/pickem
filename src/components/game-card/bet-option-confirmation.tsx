import { useHasGameStarted } from '@/hooks/use-has-game-started';
import {
  minimumLoadingDelay,
  oddsFormatter,
  pointTotalFormatter,
  spreadFormatter,
} from '@/lib/utils';
import { supabase } from '@/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useBetOptionConfirmationStore } from '../../stores/bet-option-confirmation-store';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

export function BetOptionConfirmation() {
  const { open, payload, closeDialog, setLoading, isLoading } =
    useBetOptionConfirmationStore();
  const queryClient = useQueryClient();
  const { week, year } = useSearch({ from: '/picks' });
  const hasGameStarted = useHasGameStarted(payload?.date);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (hasGameStarted)
        throw new Error(
          `${payload?.awayTeamAbbr} @ ${payload?.homeTeamAbbr} has already started`,
        );

      await Promise.all([
        supabase
          .from('picks')
          .insert({
            bet_option_id: payload!.betOptionId,
          })
          .throwOnError(),
        minimumLoadingDelay(),
      ]);
    },
    onError: error => {
      toast.error('Failed to lock in your pick. Please try again.', {
        description: error.message,
      });
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: () => {
      closeDialog();
      queryClient.invalidateQueries({ queryKey: ['game', payload!.gameId] });
      queryClient.invalidateQueries({ queryKey: ['week-slate', year, week] });
    },
  });

  if (payload === null) return null;

  const formattedLine =
    payload.type === 'spread'
      ? spreadFormatter.format(payload.line)
      : pointTotalFormatter.format(payload.line);

  const formattedOdds = oddsFormatter.format(payload.odds);

  const description = payload
    ? `${payload.awayTeamAbbr} @ ${payload.homeTeamAbbr} — ${
        payload.type === 'total'
          ? 'Total'
          : payload.target === 'home'
            ? payload.homeTeamAbbr
            : payload.awayTeamAbbr
      } ${formattedLine} (${formattedOdds})`
    : null;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="user-select-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your pick</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            disabled={isLoading}
            onClick={() => closeDialog()}
            className="min-w-[100px]"
            variant="outline">
            Cancel
          </Button>
          <Button
            type="button"
            className="min-w-[100px] bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => mutate()}
            disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
            ) : (
              <>
                <Lock className="h-[1.2rem] w-[1.2rem]" />
                Lock
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
