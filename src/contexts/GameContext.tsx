import React, { createContext, useContext, useEffect, useState } from 'react';

import { projectStorage, projectFirestore } from 'firebase_config';
import { useDocumentData } from 'react-firebase-hooks/firestore';

// import { Game, CreateGame, JoinGame, StartGame, PENDING } from '../../functions/src/types';

import { UserContext } from './UserContext';
import { randomCode, shuffle } from './utils';

export type Player = {
  uid: string;
  name: string;
  drawingUrl?: string;
};

export type Spectator = {
  uid: string;
  name: string;
};

export type Game = {
  code: string;
  creatorUid: string;
  players: Player[];
  spectators: Spectator[];
  state: number;
};

export const PENDING = 0;
export const PLAYING = 1;
export const FINISHED = 2;

type ContextProps = {
  gameCode: string;
  game: Game;
  currentPlayer: Player;
  retrieving: boolean;
  creating: boolean;
  joining: boolean;
  uploading: boolean;
  createGame: () => void;
  joinGame: (code: string) => void;
  leaveGame: () => void;
  startGame: (code: string) => void;
  finishGame: () => void;
  uploadDrawing: (blob: Blob) => void;
  error: string;
};

export const GameContext = createContext({} as ContextProps);

export const GameProvider: React.FC = (props) => {
  const { username, uid } = useContext(UserContext);
  const [gameCode, setGameCode] = useState(undefined as any);
  const [error] = useState('');

  const gameDoc = projectFirestore.doc(`games/${gameCode || '1'}`);
  const [game, retrieving] = useDocumentData<Game>(gameDoc);

  const currentPlayer = game?.players.find((pl) => !pl.drawingUrl);

  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [uploading, setUploading] = useState(false);

  const createGame = async () => {
    setCreating(true);
    const code = randomCode();
    await projectFirestore.doc(`games/${code}`).set({
      code,
      creatorUid: uid,
      players: [{ uid, name: username }],
      spectators: [],
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

    if (newGame.state !== PENDING) {
      await newGameDoc.update({ spectators: [...newGame.spectators, { uid, name: username }] });
      setGameCode(code);
      return finish();
    }

    const players = newGame?.players;

    if (!players) return finish();
    if (players.find((pl) => pl.uid === uid)) return finish();

    await newGameDoc.update({ players: [...players, { uid, name: username }] });

    setGameCode(code);
    finish();
  };

  const startGame = async () => {
    await gameDoc.update({ state: PLAYING, players: shuffle(game?.players) });
  };

  const finishGame = async () => {
    await gameDoc.update({ state: FINISHED });
  };

  const leaveGame = () => {
    setGameCode(undefined as any);
  };

  const uploadDrawing = async (blob: Blob) => {
    setUploading(true);
    const image = new Image();
    image.src = blob as any;

    const metadata = {
      contentType: 'image/png',
    };

    const players = game?.players;
    if (!players) return;

    const drawingRef = projectStorage.ref(`/drawings/${uid}-${game?.code}`);

    await drawingRef.put(blob, metadata);
    const drawingUrl = await drawingRef.getDownloadURL();

    players.forEach((pl) => {
      if (pl.uid !== uid) return;

      pl.drawingUrl = drawingUrl;
    });

    await gameDoc.update({ players });

    console.log('no drawings ', !players.find((pl) => !pl.drawingUrl));
    if (!players.find((pl) => !pl.drawingUrl)) await finishGame();

    setUploading(false);
  };

  return (
    <GameContext.Provider
      value={{
        gameCode,
        game: game || (undefined as any),
        currentPlayer: currentPlayer || (undefined as any),
        retrieving,
        joining,
        creating,
        uploading,
        createGame,
        joinGame,
        leaveGame,
        startGame,
        finishGame,
        uploadDrawing,
        error,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
