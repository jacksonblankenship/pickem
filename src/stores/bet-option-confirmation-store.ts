import { create } from 'zustand';

export type BetOptionPayload = {
  gameId: number;
  betOptionId: number;
  type: 'spread' | 'total';
  target: 'home' | 'away' | 'over' | 'under';
  line: number;
  odds: number;
  homeTeamAbbr: string;
  awayTeamAbbr: string;
  date: Date | null;
  homeTeamLogo: string;
  awayTeamLogo: string;
};

type BetOptionConfirmationState = {
  open: boolean;
  payload: BetOptionPayload | null;
  isLoading: boolean;

  openDialog: (payload: BetOptionPayload) => void;
  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
};

export const useBetOptionConfirmationStore = create<BetOptionConfirmationState>(
  set => ({
    open: false,
    payload: null,
    isLoading: false,
    openDialog: payload => set({ open: true, payload, isLoading: false }),
    closeDialog: () => set({ open: false, payload: null, isLoading: false }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
  }),
);
