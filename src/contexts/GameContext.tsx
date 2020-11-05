import React, { createContext, useState } from 'react';

import { projectFunctions, projectFirestore } from 'firebase_config';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Game } from 'types';

type ContextProps = {
  gameCode: string;
  game: Game;
  retrieving: boolean;
  creating: boolean;
  joining: boolean;
  createGame: () => void;
  joinGame: (code: string) => void;
  leaveGame: () => void;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const [gameCode, setGameCode] = useState(undefined as any);

  const doc = projectFirestore.doc(`games/${gameCode || '1'}`);
  const [game, retrieving] = useDocumentData<Game>(doc);

  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  const createGame = async () => {
    setCreating(true);
    const res = await projectFunctions.httpsCallable('createGame')();
    setGameCode(res.data);
    setCreating(false);
  };

  const joinGame = (code: string) => {
    setJoining(true);
    setGameCode(code);
    setJoining(false);
  };

  const leaveGame = () => {
    setGameCode(undefined as any);
  };

  return (
    <GameContext.Provider
      value={{
        gameCode,
        game: game || (undefined as any),
        retrieving,
        joining,
        creating,
        createGame,
        joinGame,
        leaveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
