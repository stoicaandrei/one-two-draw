import React, { createContext, useState } from 'react';

import { projectFunctions, projectFirestore } from 'firebase_config';

import { Game } from 'types';

type ContextProps = {
  game: Game;
  loading: boolean;
  createGame: () => void;
  leaveGame: () => void;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const [game, setGame] = useState(undefined as any);
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    setLoading(true);
    const res = await projectFunctions.httpsCallable('createGame')();
    setGame(res.data);
    setLoading(false);
  };

  const leaveGame = () => {
    setGame(undefined as any);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        loading,
        createGame,
        leaveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
