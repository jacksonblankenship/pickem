import { GameData } from '@/queries/game-query';
import { createContext, useContext } from 'react';

export const GameCardContext = createContext<GameData>(null!);

export function useGameCardContext() {
  const context = useContext(GameCardContext);

  if (!context) {
    throw new Error(
      'useGameCardContext must be used within a GameCardProvider',
    );
  }

  return context;
}
