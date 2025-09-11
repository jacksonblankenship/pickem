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
  'flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2',
  {
    variants: {
      gameState: {
        base: 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors duration-200',
        disabled:
          'border-gray-200 bg-white text-gray-400 opacity-40 cursor-not-allowed',
        selected:
          'border border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200 font-semibold',
        won: 'border border-green-400 bg-green-50 text-green-900 ring-2 ring-green-200 font-semibold',
        lost: 'border border-red-400 bg-red-50 text-red-900 ring-2 ring-red-200 font-semibold',
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
      return 'selected'; // covers 'pending' status
    }

    // Check if game has started - if the game has already started, disable all unpicked options
    if (hasGameStarted === true) return 'disabled';

    // Enforce pick limits for spread bets - users can only pick ONE favorite and ONE underdog per week
    if (props.type === 'spread') {
      const isPickem = option.line === 0;

      // Pickems are not allowed because a favorite and underdog can not be determined
      if (isPickem) return 'disabled';

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
      ? spreadFormatter.format(option.line)
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
