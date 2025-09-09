import { useEffect, useState } from 'react';

const ONE_SECOND = 1_000;

export function useHasGameStarted(gameDate?: Date | null) {
  const [hasGameStarted, setHasGameStarted] = useState(
    () => gameDate === undefined || gameDate === null || new Date() > gameDate,
  );

  useEffect(() => {
    if (gameDate === undefined || gameDate === null) return;

    const updateHasGameStarted = () => {
      const started = new Date() > gameDate;
      setHasGameStarted(started);
      return started;
    };

    if (updateHasGameStarted()) return;

    const id = setInterval(() => {
      if (updateHasGameStarted()) clearInterval(id);
    }, ONE_SECOND);

    return () => clearInterval(id);
  }, [gameDate]);

  return hasGameStarted;
}
