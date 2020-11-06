import React, { createContext, useContext, useState } from 'react';

import { projectFunctions, projectFirestore } from 'firebase_config';
import { useDocumentData } from 'react-firebase-hooks/firestore';

// import { Game, CreateGame, JoinGame, StartGame, PENDING } from '../../functions/src/types';

import { UserContext } from './UserContext';
import { randomCode } from './utils';

export type Player = {
  uid: string;
  name: string;
};

export type Game = {
  code: string;
  creatorUid: string;
  players: Player[];
  state: number;
};

export const PENDING = 0;
export const PLAYING = 1;
export const FINISHED = 2;

type ContextProps = {
  gameCode: string;
  game: Game;
  retrieving: boolean;
  creating: boolean;
  joining: boolean;
  createGame: () => void;
  joinGame: (code: string) => void;
  leaveGame: () => void;
  startGame: (code: string) => void;
  error: string;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = (props) => {
  const { username, uid } = useContext(UserContext);
  const [gameCode, setGameCode] = useState(undefined as any);
  const [error, setError] = useState('');

  const gameDoc = projectFirestore.doc(`games/${gameCode || '1'}`);
  const [game, retrieving] = useDocumentData<Game>(gameDoc);

  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  const createGame = async () => {
    setCreating(true);
    const code = randomCode();
    await projectFirestore.doc(`games/${code}`).set({
      code,
      creatorUid: uid,
      players: [{ uid, name: username }],
      state: PENDING,
    });

    setGameCode(code);

    setCreating(false);
  };

  const joinGame = async (code: string) => {
    setJoining(true);

    const finish = () => setJoining(false);

    const newGameDoc = projectFirestore.doc(`games/${code}`);
    const newGame = (await newGameDoc.get()).data() as Game;

    const players = newGame?.players;

    if (!players) return finish();
    if (players.find((pl) => pl.uid === uid)) return finish();

    await newGameDoc.update({ players: [...players, { uid, name: username }] });

    setGameCode(code);
    finish();
  };

  const startGame = async () => {
    await gameDoc.update({ state: PLAYING });
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
        startGame,
        error,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
