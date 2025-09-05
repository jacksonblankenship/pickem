import { GameCardContext } from '@/context/game-card-context';
import { GameData } from '@/queries/game-query';

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
