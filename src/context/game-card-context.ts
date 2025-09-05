import { GameData } from '@/queries/game-query';
import { createContext, useContext } from 'react';

export const GameCardContext = createContext<GameData>(null!);

export function useGameCardContext() {
  return useContext(GameCardContext);
}
