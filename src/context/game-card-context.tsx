import { GameData } from '@/queries/game-query';
import { createContext, useContext } from 'react';

const GameCardContext = createContext<GameData>(null!);

export function GameCardProvider(props: {
  children: React.ReactNode;
  data: GameData;
}) {
  return (
    <GameCardContext.Provider value={props.data}>
      {props.children}
    </GameCardContext.Provider>
  );
}

export function useGameCardContext() {
  return useContext(GameCardContext);
}
