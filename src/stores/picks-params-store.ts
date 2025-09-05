import { create } from 'zustand';

interface PicksParamsContext {
  groupId: number;
  year: number;
  week: number;
  setParams: (params: { groupId: number; year: number; week: number }) => void;
}

export const usePicksParamsStore = create<PicksParamsContext>(set => ({
  groupId: 0,
  year: 0,
  week: 0,
  setParams: params =>
    set(state => ({
      ...state,
      ...params,
    })),
}));
