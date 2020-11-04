import React, { createContext, useEffect, useState } from 'react';

import { projectFirestore } from 'firebase_config';

export type Game = {
  id: string;
  code: string;
  creatorUid: string;
  playerUidS: string[];
};

type ContextProps = {
  game: Game;
  id: string;
  setId: (id: string) => void;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const [id, setId] = useState('');

  return (
    <GameContext.Provider
      value={{
        id,
        game: {} as Game,
        setId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
