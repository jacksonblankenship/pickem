import { useHasGameStarted } from '@/hooks/use-has-game-started';
import { PropsWithClassName } from '@/lib/types';
import {
  cn,
  oddsFormatter,
  pointTotalFormatter,
  spreadFormatter,
} from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';
import { useGameCardContext } from '../../context/game-card-context';
import { useWeekSlateContext } from '../../context/week-slate-context';
import { useBetOptionConfirmationStore } from '../../stores/bet-option-confirmation-store';
import { Skeleton } from '../ui/skeleton';

const betOptionVariants = cva(
  'flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 transition-all duration-200 active:scale-[0.98] active:transition-transform active:duration-75 disabled:pointer-events-none',
  {
    variants: {
      gameState: {
        base: 'border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors duration-200 dark:border-gray-600 dark:hover:bg-blue-950/20',
        disabled:
          'border-gray-200 text-muted-foreground opacity-40 cursor-not-allowed dark:border-gray-700 dark:text-gray-500 dark:opacity-60',
        selected:
          'border border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100 ring-2 ring-blue-200 dark:ring-blue-800 font-semibold',
        won: 'border border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-200 dark:ring-emerald-800 font-semibold',
        lost: 'border border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100 ring-2 ring-rose-200 dark:ring-rose-800 font-semibold',
        push: 'border border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100 ring-2 ring-amber-200 dark:ring-amber-800 font-semibold',
      },
    },
    defaultVariants: { gameState: 'base' },
  },
);

type SpreadBetOptionProps = {
  type: 'spread';
  target: 'home' | 'away';
};

type TotalBetOptionProps = {
  type: 'total';
  target: 'over' | 'under';
};

type BetOptionProps = PropsWithClassName<
  SpreadBetOptionProps | TotalBetOptionProps
>;

export function BetOption(props: BetOptionProps) {
  const {
    id,
    options,
    homeTeamAbbr,
    awayTeamAbbr,
    homeTeamLogo,
    awayTeamLogo,
    date,
  } = useGameCardContext();
  const openDialog = useBetOptionConfirmationStore(s => s.openDialog);
  const { favoriteGameId, underdogGameId, pointTotalGameId } =
    useWeekSlateContext();
  const hasGameStarted = useHasGameStarted(date);

  const option =
    props.type === 'spread'
      ? options.spread[props.target]
      : options.total[props.target];

  const gameState = useMemo<
    VariantProps<typeof betOptionVariants>['gameState']
  >(() => {
    // Handle missing data - if the option data is not available, show as disabled
    if (option === null) return 'disabled';

    /*
     * Show user's existing picks - if this option has already been picked by the user,
     * show its current status. This takes priority over all other rules (even if the game has started)
     */
    if (option.picked === true) {
      if (option.status === 'won') return 'won';
      if (option.status === 'lost') return 'lost';
      if (option.status === 'push') return 'push';
      return 'selected'; // covers 'pending' status
    }

    // Check if game has started - if the game has already started, disable all unpicked options
    if (hasGameStarted === true) return 'disabled';

    // Enforce pick limits for spread bets - users can only pick ONE favorite and ONE underdog per week
    if (props.type === 'spread') {
      // Pickems are not allowed because a favorite and underdog can not be determined
      if (option.line === 0) return 'disabled';

      const isFavorite = option.line < 0;

      if (isFavorite) {
        /*
         * If this is a favorite option:
         * - Disable if THIS game already has an underdog pick (can't pick both sides of same game)
         * - Disable if ANY other game's favorite has been picked (only one favorite per week)
         */
        if (underdogGameId === id) return 'disabled';
        if (favoriteGameId !== undefined) return 'disabled';
      } else {
        /*
         * If this is an underdog option:
         * - Disable if THIS game already has a favorite pick (can't pick both sides of same game)
         * - Disable if ANY other game's underdog has been picked (only one underdog per week)
         */
        if (favoriteGameId === id) return 'disabled';
        if (underdogGameId !== undefined) return 'disabled';
      }
    }

    // Enforce pick limits for total bets - users can only pick ONE total (over/under) per week
    if (props.type === 'total' && pointTotalGameId !== undefined) {
      return 'disabled';
    }

    // Allow selection - if we've passed all checks, this option can be selected
    return 'base';
  }, [
    props.type,
    option,
    hasGameStarted,
    favoriteGameId,
    underdogGameId,
    pointTotalGameId,
    id,
  ]);

  if (option === null) return <Skeleton className="h-8 w-full" />;

  const formattedIdentifier =
    props.type === 'spread'
      ? props.target === 'home'
        ? homeTeamAbbr
        : awayTeamAbbr
      : props.target === 'over'
        ? 'Over'
        : 'Under';

  const formattedLine =
    props.type === 'spread'
      ? option.line === 0
        ? 'PK'
        : spreadFormatter.format(option.line)
      : pointTotalFormatter.format(option.line);

  const formattedOdds = oddsFormatter.format(option.odds);

  return (
    <button
      className={cn(
        betOptionVariants({ gameState: gameState }),
        props.className,
      )}
      disabled={gameState !== 'base'}
      onClick={() =>
        openDialog({
          date,
          awayTeamAbbr,
          awayTeamLogo,
          homeTeamAbbr,
          homeTeamLogo,
          type: props.type,
          target: props.target,
          line: option.line,
          odds: option.odds,
          gameId: id,
          betOptionId: option.id,
        })
      }>
      <span className="mr-2 text-xs font-semibold">{formattedIdentifier}</span>
      <span className="mr-auto text-xs font-medium">{formattedLine}</span>
      <span className="text-xs">{formattedOdds}</span>
    </button>
  );
}
