import React, { createContext, useContext, useState } from 'react';

import { projectFunctions, projectFirestore } from 'firebase_config';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Game, CreateGame, JoinGame } from 'types';

import { UserContext } from './UserContext';

type ContextProps = {
  gameCode: string;
  game: Game;
  retrieving: boolean;
  creating: boolean;
  joining: boolean;
  createGame: () => void;
  joinGame: (code: string) => void;
  leaveGame: () => void;
  error: string;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = (props) => {
  const { username } = useContext(UserContext);
  const [gameCode, setGameCode] = useState(undefined as any);
  const [error, setError] = useState('');

  const doc = projectFirestore.doc(`games/${gameCode || '1'}`);
  const [game, retrieving] = useDocumentData<Game>(doc);

  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  const createGame = async () => {
    setCreating(true);
    const fn: CreateGame = projectFunctions.httpsCallable('createGame');
    const res = await fn({ username });

    if (typeof res.data === 'string') {
      setError(res.data);
    } else {
      setGameCode(res.data.code);
    }

    setCreating(false);
  };

  const joinGame = async (code: string) => {
    setJoining(true);
    const fn: JoinGame = projectFunctions.httpsCallable('joinGame');
    const res = await fn({ username, code });

    if (typeof res.data === 'string') {
      setError(res.data);
    } else {
      setGameCode(code);
    }

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
        error,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
