import {
  oddsFormatter,
  pointTotalFormatter,
  spreadFormatter,
  waitFor,
} from '@/lib/utils';
import { supabase } from '@/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { Loader2, Lock } from 'lucide-react';
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

  const { mutate } = useMutation({
    mutationFn: async () => {
      await Promise.all([
        supabase
          .from('picks')
          .insert({
            bet_option_id: payload!.betOptionId,
          })
          .throwOnError(),
        waitFor(1000),
      ]);
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
      <AlertDialogContent>
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
            className="min-w-[100px] bg-indigo-700"
            onClick={() => mutate()}
            disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Lock />
                Lock
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
