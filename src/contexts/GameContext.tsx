import React, { createContext, useEffect, useState } from 'react';

import { projectFirestore } from 'firebase_config';

export type Game = {
  id: string;
  creatorUid: string;
  playerUidS: string[];
};

type ContextProps = {
  game: Game;
  id: string;
  setId: (id: string) => void;
};

const defaultGame: Game = {
  id: '',
  creatorUid: '',
  playerUidS: [],
};

const defaultState: ContextProps = {
  id: '',
  game: defaultGame,
  setId: () => {},
};

export const GameContext = createContext(defaultState);

export const GameProvider: React.FC = ({ children }) => {
  const [id, setId] = useState('');

  return (
    <GameContext.Provider
      value={{
        id,
        game: defaultGame,
        setId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
