import React, { createContext, useState } from 'react';

import { projectFunctions } from 'firebase_config';

import { Game } from 'types';

type ContextProps = {
  game: Game;
  id: string;
  setId: (id: string) => void;
  createGame: () => void;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const [id, setId] = useState('');

  const createGame = async () => {
    await projectFunctions.httpsCallable('createGame')();
  };

  return (
    <GameContext.Provider
      value={{
        id,
        game: {} as Game,
        setId,
        createGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
