import {
  oddsFormatter,
  pointTotalFormatter,
  spreadFormatter,
  waitFor,
} from '@/lib/utils';
import { usePicksParamsStore } from '@/stores/picks-params-store';
import { supabase } from '@/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const { year, week } = usePicksParamsStore();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await Promise.all([
        supabase
          .from('picks')
          .insert({
            bet_option_id: payload!.betOptionId,
          })
          .throwOnError(),
        waitFor(2000),
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

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your pick</AlertDialogTitle>
          <AlertDialogDescription>
            {payload
              ? `${payload.awayTeamAbbr} @ ${payload.homeTeamAbbr} — ${
                  payload.type === 'total'
                    ? 'Total'
                    : payload.target === 'home'
                      ? payload.homeTeamAbbr
                      : payload.awayTeamAbbr
                } ${formattedLine} (${formattedOdds})`
              : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            disabled={isLoading}
            onClick={() => closeDialog()}
            variant="outline">
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-indigo-700"
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
