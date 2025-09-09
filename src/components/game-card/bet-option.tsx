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
      state: {
        base: 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors duration-200',
        disabled:
          'border-gray-200 bg-white text-gray-400 opacity-40 cursor-not-allowed',
        selected:
          'border border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200 font-semibold',
        won: 'border border-green-400 bg-green-50 text-green-900 ring-2 ring-green-200 font-semibold',
        lost: 'border border-red-400 bg-red-50 text-red-900 ring-2 ring-red-200 font-semibold',
      },
    },
    defaultVariants: { state: 'base' },
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
  const { favoritePicked, underdogPicked, totalPicked } = useWeekSlateContext();
  const hasGameStarted = useHasGameStarted(date);

  const option =
    props.type === 'spread'
      ? options.spread[props.target]
      : options.total[props.target];

  const state = useMemo<VariantProps<typeof betOptionVariants>['state']>(() => {
    // If the option is not available for some reason, default to disabled
    if (option === null) return 'disabled';

    // Always show the user's pick, regardless of game start
    if (option.picked === true) {
      if (option.status === 'won') return 'won';
      if (option.status === 'lost') return 'lost';
      return 'selected'; // covers 'pending'
    }

    // If not picked, fall back to availability rules
    if (hasGameStarted === true) return 'disabled';

    if (props.type === 'spread') {
      if (option.line < 0 && favoritePicked) return 'disabled';
      if (option.line > 0 && underdogPicked) return 'disabled';
    }

    if (props.type === 'total' && totalPicked === true) return 'disabled';

    return 'base';
  }, [
    option,
    props.type,
    hasGameStarted,
    favoritePicked,
    underdogPicked,
    totalPicked,
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
      className={cn(betOptionVariants({ state }), props.className)}
      disabled={state !== 'base'}
      onClick={() => {
        if (state === 'base') {
          openDialog({
            awayTeamAbbr,
            awayTeamLogo,
            homeTeamAbbr,
            homeTeamLogo,
            type: props.type,
            target: props.target,
            line: option.line,
            odds: option.odds,
            date,
            gameId: id,
            betOptionId: option.id,
          });
        }
      }}>
      <span className="mr-2 text-xs font-semibold">{formattedIdentifier}</span>
      <span className="mr-auto text-xs font-medium">{formattedLine}</span>
      <span className="text-xs">{formattedOdds}</span>
    </button>
  );
}
